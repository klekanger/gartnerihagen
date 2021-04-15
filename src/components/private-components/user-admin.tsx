import * as React from 'react';
import { useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

function UserAdmin() {
  const { user, isAuthenticated, error } = useAuth0();

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return;
  }

  const dummyUsers = [
    { userName: 'Kurt', userEmail: 'kurt@lekanger.no' },
    { userName: 'Kari', userEmail: 'kari@sdfsfd' },
    { userName: 'Jan Erik', userEmail: 'janerik@sdfsdfsdf.sd' },
    { userName: 'Ann Kristin', userEmail: 'annkristin@sdfsdf.no' },
  ];

  return (
    <Box
      maxWidth={['97%', '95%', '95%', '70%']}
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
        >
          Opprett bruker
        </Button>
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          variant='standard'
          _hover={{ bg: '#555' }}
        >
          Tilbakestill passord
        </Button>
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          variant='standard'
          _hover={{ bg: '#555' }}
        >
          Endre kontoopplysninger
        </Button>
      </Stack>
      <Heading size='md' pt={8}>
        Liste over eksisterende brukere:
      </Heading>
      <Table variant='unstyled' mt={8} mb={16} size='lg'>
        <Thead bg='#ddd' textColor='black'>
          <Tr>
            <Th>Brukernavn</Th>
            <Th>Epost</Th>
            <Th>Endre/Slett bruker</Th>
          </Tr>
        </Thead>
        <Tbody textColor='black'>
          {dummyUsers.map((element) => (
            <Tr borderBottom='1px solid #ddd' bg='gray.100' key={element}>
              <Td>
                <Link href='#' isExternal>
                  {element.userName}
                </Link>
              </Td>
              <Td>{element.userEmail}</Td>
              <Td>
                <Button>Endre</Button> <Button>Slett</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default UserAdmin;
