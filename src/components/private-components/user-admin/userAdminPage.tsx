import * as React from 'react';
import { useState, useRef } from 'react';
import LoadingSpinner from '../../loading-spinner';
import NotLoggedIn from '../../notLoggedIn';
import NotLoggedInGiveConsent from '../../notLoggedInGiveConsent';
import ErrorPage from '../../errorPage';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetAllUsers } from '../../hooks/useGetAllUsers';
import { navigate } from 'gatsby';
import { requestChangePassword } from '../requestChangePassword';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Badge,
  Box,
  Flex,
  Image,
  Text,
  Button,
  Stack,
  Grid,
  Heading,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';

const rolesToNorwegian = {
  user: 'Bruker',
  editor: 'Redaktør',
  admin: 'Administrator',
};

const UserAdminPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const [isDeleteUserAlertOpen, setIsDeleteUserAlertOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState({
    id: '',
    name: '',
  });

  const toast = useToast();
  const onClose = () => setIsDeleteUserAlertOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const { data, loading, error, getToken } = useGetAllUsers();

  const userRoles: string[] = user['https:/gartnerihagen-askim.no/roles'];
  const isAdmin: boolean = userRoles.includes('admin');
  const isEditor: boolean = userRoles.includes('editor');

  if (loading) {
    return (
      <LoadingSpinner spinnerMessage='Kobler til brukerkonto-administrasjon' />
    );
  }

  if (error || data?.body?.error) {
    if (error?.name === 'SyntaxError') {
      return (
        <ErrorPage
          errorTitle='Noe gikk galt'
          errorMsg='Trykk oppdater/refresh for å prøve på nytt. Ta kontakt med styret ved vedvarende problemer.'
        />
      );
    }
    if (error?.error === 'login_required') {
      return (
        <NotLoggedIn
          title='Logg inn for brukeradministrasjon'
          description='Du må logge inn for å administrere brukerkontoer for Boligsameiet Gartnerihagen. 
        Du vil da kunne legge til, slette eller endre brukere, samt gi brukere admin-tilgang.
        Ta kontakt med styret.'
          redirectUser='/user-admin'
        />
      );
    }
    if (error?.error === 'consent_required') {
      return <NotLoggedInGiveConsent buttonLink={getToken} />;
    }
    return <ErrorPage errorMsg={error?.message || data?.body?.error} />;
  }

  // Handle errors from the API
  // For example if the user does not have access to user admin
  if (data.error || !data) {
    return (
      <ErrorPage
        errorTitle={`Noe gikk galt: ${data.error} (${data.status_code})`}
        errorMsg={data.error_description}
      />
    );
  }

  // Filter out selected users
  const myUsers = data?.body?.users;
  const filteredResults = myUsers.filter((currentUser) => {
    const userToUppercase = currentUser.name.toUpperCase();

    if (selectedRole === 'all') {
      return userToUppercase.includes(searchTerm.toUpperCase());
    } else {
      return (
        userToUppercase.includes(searchTerm.toUpperCase()) &&
        currentUser?.roles.includes(selectedRole)
      );
    }
  });

  // Sort users by name (case insensitive)
  const sortedUsers = filteredResults.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const handleDeleteUser = async () => {
    const opts = {
      audience: 'https://useradmin.gartnerihagen-askim.no',
      scope: 'delete:users',
    };

    try {
      if (!userToDelete.id.includes('auth0')) {
        throw new Error('User ID is not valid');
      }

      const accessToken = await getAccessTokenSilently(opts);
      const api = await fetch(`/api/admin-users/delete-user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({ idToDelete: userToDelete.id }),
      });

      if (api?.status !== 200) {
        throw new Error(`${api.statusText} (${api.status})`);
      }

      const isJson = api.headers
        .get('content-type')
        ?.includes('application/json');

      const data = isJson && (await api.json());

      if (!data) {
        throw new Error('no_data');
      }

      if (data.error) {
        const { error_description } = JSON.parse(data?.error_description);
        throw new Error(`${data.error} : ${JSON.stringify(error_description)}`);
      }
      toast({
        title: `Bruker ${userToDelete.name} slettet`,
        description: 'Brukeren har ikke lenger tilgang',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      window.location.reload(); // Reload to get updated list of users
    } catch (error) {
      toast({
        title: 'Noe gikk galt',
        description: `${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteUserAlert = (
    <AlertDialog
      isOpen={isDeleteUserAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg='white'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Slett bruker
          </AlertDialogHeader>
          <AlertDialogBody>
            Er du sikker på at du vil slette brukeren{' '}
            <strong>{userToDelete.name}</strong>? Du kan ikke angre.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant='standard-light' ref={cancelRef} onClick={onClose}>
              Avbryt
            </Button>
            <Button
              variant='danger'
              textColor='white'
              onClick={() => {
                handleDeleteUser();
                onClose();
              }}
              ml={3}
            >
              Slett bruker
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  const userList = (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(2, 1fr)',
        xl: 'repeat(3, 1fr)',
      }}
      pt={8}
      gap={4}
      mb={4}
      mt={0}
    >
      {sortedUsers.map((userToShow) => (
        <Box
          key={userToShow?.user_id}
          minH={64}
          minW='100%'
          borderWidth='1px'
          rounded='md'
          shadow='lg'
          bgColor='#eee'
          overflow='hidden'
        >
          <Flex
            m={8}
            direction={['column', 'column', 'row', 'row']}
            align={['center', 'center', 'left', 'left']}
          >
            <Image
              src={userToShow?.picture}
              alt={userToShow?.name}
              rounded='50%'
              width={24}
              my={4}
              mx={8}
            />

            <Box flexDirection='column'>
              <Text
                as='div'
                fontSize='lg'
                fontWeight='semibold'
                align='left'
                overflowWrap='anywhere'
              >
                {userToShow?.name}
                <br />
              </Text>
              <Text as='div' fontSize='md' align='left' overflowWrap='anywhere'>
                {userToShow?.email}
                <br />
                {userToShow?.roles.map((role) => (
                  <div key={`${userToShow?.user_id}-${role}`}>
                    {role !== 'user' && (
                      <Badge colorScheme={role === 'admin' ? 'red' : 'green'}>
                        {rolesToNorwegian[role]}
                      </Badge>
                    )}{' '}
                  </div>
                ))}
                {userToShow?.user_metadata?.subscribeToEmails && (
                  <Badge colorScheme='yellow'>Får epost-varsling</Badge>
                )}
              </Text>
            </Box>
          </Flex>

          <Box mx={8} mb={8}>
            <Stack
              direction={['column', 'column', 'row', 'row']}
              align='center'
              justify='space-between'
            >
              <Button
                variant='standard-light'
                w='100%'
                p={8}
                onClick={() =>
                  navigate('/user-admin/update-user', {
                    state: userToShow,
                  })
                }
                _hover={{ bg: 'hoverButtonColor' }}
              >
                Endre bruker
              </Button>
              <Button
                variant='danger'
                w='100%'
                p={8}
                onClick={() => {
                  setIsDeleteUserAlertOpen(true);
                  setUserToDelete({
                    id: userToShow?.user_id,
                    name: userToShow?.name,
                  });
                }}
                _hover={{ bg: 'hoverButtonDangerColor' }}
              >
                Slett bruker
              </Button>
            </Stack>
            <Stack
              direction={['column', 'column', 'row', 'row']}
              my={[2, 2, 2, 2]}
              align='center'
              justify='space-between'
            >
              <Button
                variant='standard-light'
                w='100%'
                p={8}
                onClick={() => requestChangePassword(userToShow?.email)}
                _hover={{ bg: 'hoverButtonColor' }}
              >
                Bytt passord
              </Button>
            </Stack>
          </Box>
        </Box>
      ))}
    </Grid>
  );

  return (
    <>
      <Box
        maxWidth={['97%', '95%', '95%', '90%']}
        ml='0'
        pt={[8, 16, 8, 16]}
        pb={[8, 8, 8, 16]}
        textAlign='center'
      >
        <Box
          my={[4, 4, 8, 8]}
          py={8}
          borderWidth='1px'
          rounded='md'
          shadow='lg'
          bgColor='#eee'
        >
          <Heading as='h1' size='2xl' pt={[0, 0, 8, 8]} maxWidth='95vw'>
            Bruker&shy;administrasjon
          </Heading>

          <Box>
            <Box>
              <b>Du er innlogget som:</b> {user?.name}{' '}
            </Box>
            <Box>
              <b>E-post:</b> {user?.email}
            </Box>
            {isAdmin && <Badge colorScheme='red'>Administrator</Badge>}{' '}
            {isEditor && <Badge colorScheme='green'>Redaktør</Badge>}
          </Box>

          <Stack
            direction={['column', 'column', 'row', 'row']}
            my={[4, 4, 8, 8]}
            mx={8}
            align='center'
            justify='center'
          >
            <Input
              borderColor='black'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Filtrer på bruker (tast inn navn)'
              size='md'
              maxW='20rem'
            />
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              borderColor='black'
              maxW='20rem'
            >
              <option value='all'>Vis alle</option>
              <option value='user'>Brukere</option>
              <option value='editor'>Redaktører</option>
              <option value='admin'>Administratorer</option>
            </Select>
          </Stack>
          <Button
            minW={['40%', '40%', '20%', '20%']}
            minH='3rem'
            variant='standard-light'
            role='link'
            onClick={() => navigate('/user-admin/create-user')}
          >
            Opprett ny bruker
          </Button>
        </Box>
        {userList}
        {deleteUserAlert}
      </Box>
    </>
  );
};

export default UserAdminPage;
