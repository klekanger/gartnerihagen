import * as React from 'react';
import { useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
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
  const { user, isLoading, isAuthenticated, logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

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
      <Text>
        <b>Du er innlogget som:</b> {user?.nickname}
        <Text>
          <b>E-post:</b> {user?.email}
        </Text>
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
        >
          Logg ut
        </Button>
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          variant='standard'
          disabled
          _hover={{ bg: '#555' }}
        >
          Bytt passord
        </Button>
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          variant='standard'
          disabled
          _hover={{ bg: '#555' }}
        >
          Endre kontoopplysninger
        </Button>
      </Stack>
      <Text>For å slette konto eller endre kontoopplysninger,</Text>
      <Text>ta kontakt med styret. </Text>
      {logOutAlert}
    </Box>
  );
}
