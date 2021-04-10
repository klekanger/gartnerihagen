import * as React from 'react';
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

export default function UserAdminPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth0();
  console.log('user: ', user);
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
        Brukeradministrasjon
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
          onClick={() => logout()}
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
    </Box>
  );
}
