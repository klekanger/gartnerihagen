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
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

export default function MinSide() {
  const { user, isAuthenticated, error, logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const userRoles = user['https:/gartnerihagen-askim.no/roles'];
  const isAdmin = userRoles.includes('admin');
  const isEditor = userRoles.includes('editor');

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return;
  }

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
            <Button variant='standard' ref={cancelRef} onClick={onClose}>
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
      h='80vh'
      ml='0'
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
      </Text>
      <Stack
        direction={['column', 'column', 'row', 'row']}
        my={[4, 4, 8, 8]}
        align='center'
        justify='center'
      >
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          variant='standard'
          onClick={() => setIsOpen(true)}
          _hover={{ bg: '#555' }}
        >
          Logg ut
        </Button>
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          variant='standard'
          onClick={() => requestChangePassword(user?.email)}
          _hover={{ bg: '#555' }}
        >
          Bytt passord
        </Button>

        {isAdmin && (
          <Button
            minW={['40%', '40%', '20%', '20%']}
            minH='3rem'
            variant='standard'
            onClick={() => navigate('/user-admin/')}
            _hover={{ bg: '#555' }}
          >
            Bruker&shy;admin
          </Button>
        )}

        {isEditor && (
          <Button
            minW={['40%', '40%', '20%', '20%']}
            minH='3rem'
            variant='standard'
            onClick={() =>
              navigate('https://app.contentful.com/spaces/wxoemgzywng5')
            }
            _hover={{ bg: '#555' }}
          >
            Rediger innhold
          </Button>
        )}
      </Stack>
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
