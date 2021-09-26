import * as React from 'react';
import { useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { navigate } from 'gatsby';
import { requestChangePassword } from './requestChangePassword';

import {
  Badge,
  Box,
  Image,
  Heading,
  Text,
  Button,
  Grid,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

export default function MyPage() {
  const {
    user,
    isAuthenticated,
    error,
    logout,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const userRoles = user['https:/gartnerihagen-askim.no/roles'];
  const { subscribeToEmails } =
    user['https:/gartnerihagen-askim.no/user_metadata'] || false;
  const [hasSubscribedToEmail, setHasSubscribedToEmail] =
    useState(subscribeToEmails);
  const isAdmin = userRoles.includes('admin');
  const isEditor = userRoles.includes('editor');

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return;
  }

  const handleEmailAlertChange = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: 'https://useradmin.gartnerihagen-askim.no',
        scope: 'update:users_app_metadata',
      });

      const api = await fetch(`/api/admin-users/subscribe-to-emails`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          user_id: user.sub,
          user_metadata: {
            subscribeToEmails: !hasSubscribedToEmail,
          },
        }),
      });

      const isJson = api.headers
        .get('content-type')
        ?.includes('application/json');

      const data = isJson && (await api.json());

      if (!data) {
        throw new Error('no_data');
      }

      if (data.error) {
        throw new Error(
          `${data.error} : ${JSON.stringify(data?.error_description)}`
        );
      }

      toast({
        title: `${data?.body?.status_description}`,
        description: `${hasSubscribedToEmail ? 'Avsluttet' : 'Aktivert'}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setHasSubscribedToEmail(!hasSubscribedToEmail);
    } catch (error) {
      if (error?.error === 'consent_required') {
        await getAccessTokenWithPopup({
          audience: 'https://useradmin.gartnerihagen-askim.no',
          scope: 'update:users_app_metadata',
        });
      }
    }
  };

  // Define alert dialog. Are you sure you want to log out?
  const logOutAlert = (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg='white'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Logg ut
          </AlertDialogHeader>
          <AlertDialogBody>Er du sikker på at du vil logge ut?</AlertDialogBody>

          <AlertDialogFooter>
            <Button variant='standard-light' ref={cancelRef} onClick={onClose}>
              Avbryt
            </Button>
            <Button
              variant='danger'
              textColor='white'
              onClick={() => logout()}
              ml={3}
            >
              Logg ut
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Box
      maxWidth={['97%', '95%', '95%', '70%']}
      my={8}
      pt={[8, 16, 8, 16]}
      pb={[8, 8, 8, 16]}
      textAlign='center'
    >
      <Heading
        as='h1'
        size='2xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        Min side
      </Heading>
      <Box align='center' pb={8}>
        <Image src={user?.picture} alt={user?.name} rounded='50%' width={32} />
      </Box>
      <Text as='div'>
        <b>Du er innlogget som:</b> {user?.name}
        <Text>
          <b>E-post:</b> {user?.email}
        </Text>
        {isAdmin && <Badge colorScheme='red'>Administrator</Badge>}{' '}
        {isEditor && <Badge colorScheme='green'>Redaktør</Badge>}
        {hasSubscribedToEmail && (
          <Badge colorScheme='yellow'>Epost-varsling</Badge>
        )}
      </Text>

      <Grid
        templateColumns={[
          'repeat(1, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(3, 1fr)',
        ]}
        mt={4}
        border='1px solid #ddd'
      >
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          margin={4}
          variant='standard-light'
          onClick={() => setIsOpen(true)}
          _hover={{ bg: 'hoverButtonColor' }}
        >
          Logg ut
        </Button>
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          margin={4}
          variant='standard-light'
          onClick={() => requestChangePassword(user?.email)}
          _hover={{ bg: 'hoverButtonColor' }}
        >
          Bytt passord
        </Button>

        {isAdmin && (
          <Button
            minW={['40%', '40%', '20%', '20%']}
            minH='3rem'
            margin={4}
            variant='standard-light'
            onClick={() => navigate('/user-admin/')}
            _hover={{ bg: 'hoverButtonColor' }}
          >
            Bruker&shy;admin
          </Button>
        )}

        {isEditor && (
          <Button
            minW={['40%', '40%', '20%', '20%']}
            minH='3rem'
            margin={4}
            variant='standard-light'
            onClick={() =>
              navigate('https://app.contentful.com/spaces/wxoemgzywng5')
            }
            _hover={{ bg: 'hoverButtonColor' }}
          >
            Rediger innhold
          </Button>
        )}

        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          margin={4}
          variant='standard-light'
          onClick={() => handleEmailAlertChange()}
        >
          Slå {hasSubscribedToEmail ? 'av' : 'på'} epost-varsling
        </Button>
      </Grid>
      {!isAdmin && (
        <>
          <Text>For å slette konto eller endre kontoopplysninger,</Text>
          <Text>ta kontakt med styret. </Text>
        </>
      )}
      {logOutAlert}
    </Box>
  );
}
