import * as React from 'react'
import { useContext, useRef, useState } from 'react';
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
import { IdentityContext } from '../../context/identity-context';

export default function MinSide() {
  const { user, netlifyIdentity } = useContext(IdentityContext);
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
              onClick={netlifyIdentity.logout}
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
      w='95vw'
      ml='0'
      pt={[8, 16, 8, 16]}
      pb={[8, 8, 8, 16]}
      pr={['0', '0', '5vw', '30vw']}
      textAlign={['center', 'center', 'left', 'left']}
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
        <b>Du er innlogget som:</b> {user?.user_metadata.full_name}
        <Text>
          <b>E-post:</b> {user?.email}
        </Text>
      </Text>
      <Stack
        direction={['column', 'column', 'row', 'row']}
        my={[4,4,8,8]}
        align={['center', 'center', 'left', 'left']}
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
        >
          Bytt passord
        </Button>
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          variant='standard'
        >
          Slett konto
        </Button>
      </Stack>
      {logOutAlert}
    </Box>
  );
}
