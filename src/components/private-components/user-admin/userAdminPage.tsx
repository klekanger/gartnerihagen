import * as React from 'react';
import { useState } from 'react';
import LoadingSpinner from '../../loading-spinner';
import NotLoggedIn from '../../notLoggedIn';
import NotLoggedInGiveConsent from '../../notLoggedInGiveConsent';
import ErrorPage from '../../errorPage';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../../hooks/useApi';
import { formatDate } from '../../../utils/formatDate';
import { navigate } from 'gatsby';

import {
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
  FormControl,
  Radio,
  RadioGroup,
  Select,
} from '@chakra-ui/react';

const rolesToNorwegian = {
  user: 'Bruker',
  editor: 'Redaktør',
  admin: 'Administrator',
};

const UserAdminPage = () => {
  const { user } = useAuth0();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const { data, loading, error, getToken } = getAllUsers();

  const userRoles = user['https:/gartnerihagen-askim.no/roles'];
  const isAdmin = userRoles.includes('admin');
  const isEditor = userRoles.includes('editor');

  if (loading) {
    return (
      <LoadingSpinner spinnerMessage='Kobler til brukerkonto-administrasjon' />
    );
  }

  if (error || data?.body?.error) {
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

  // Handle errors from the list-users API
  // For example if the user does not have access to user admin
  if (data.error || !data) {
    return (
      <ErrorPage
        errorTitle={`Noe gikk galt: ${data.error} (${data.status_code})`}
        errorMsg={data.error_description}
      />
    );
  }

  const myUsers = data.body.users;

  // Filter out selected users
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
              width={16}
              my={4}
              mx={8}
            />
            <Box flexDirection='column'>
              <Text as='div' fontSize='lg' fontWeight='semibold' align='left'>
                {userToShow?.name}
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
                variant='standard'
                w='100%'
                p={8}
                onClick={() =>
                  navigate('/user-admin/update-user', {
                    state: userToShow,
                  })
                }
              >
                Endre bruker
              </Button>
              <Button variant='danger' w='100%' p={8}>
                Slett bruker
              </Button>
            </Stack>
            <Stack
              direction={['column', 'column', 'row', 'row']}
              my={[2, 2, 2, 2]}
              align='center'
              justify='space-between'
            >
              <Button variant='standard' w='100%' p={8}>
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
            variant='standard'
            role='link'
            onClick={() => navigate('/user-admin/create-user')}
          >
            Opprett ny bruker
          </Button>
        </Box>
        {userList}
      </Box>
    </>
  );
};

export default UserAdminPage;

//
// Gets a list of all the users

function getAllUsers() {
  const { getAccessTokenWithPopup } = useAuth0();
  const opts = {
    audience: 'https://useradmin.gartnerihagen-askim.no',
    scope: 'read:users read:roles read:role_members',
  };

  const { loading, error, refresh, data } = useApi(
    '/api/admin-users/get-users-in-role',
    opts
  );

  async function getTokenAndTryAgain() {
    try {
      await getAccessTokenWithPopup(opts);
      refresh();
    } catch (err) {
      console.error('Noe gikk galt:  ', err);
    }
  }

  return { data, loading, error, getToken: () => getTokenAndTryAgain() };
}
