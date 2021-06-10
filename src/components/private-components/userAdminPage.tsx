import * as React from 'react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loading-spinner';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Stack,
  Grid,
} from '@chakra-ui/react';

export default function UserAdminPage() {
  const {
    user,
    isLoading,
    error,
    logout,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  const [myUsers, setUsers] = useState(null);

  useEffect(() => {
    const opts = {
      audience: 'https://useradmin.gartnerihagen-askim.no',
    };

    // Fetch all users from user admin API
    async function getUserData() {
      try {
        const accessToken = await getAccessTokenSilently(opts);

        await fetch('/api/list-users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.text())
          .then((result) => setUsers(JSON.parse(result)));
      } catch (error) {
        console.error('ERROR: ', error);
        if (error.error === 'consent_required') {
          await getAccessTokenWithPopup();
        }
      }
    }
    getUserData();
  }, []);

  if (isLoading || !myUsers) {
    return <LoadingSpinner spinnerMessage='Laster inn brukere' />;
  }

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  // Sort users by name (case insensitive)

  const sortedUsers = myUsers.body.data.sort((a, b) => {
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

  return (
    <>
      <Box
        maxWidth={['97%', '95%', '95%', '90%']}
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
        <Box>
          <Box>
            <b>Du er innlogget som:</b> {user?.name}
          </Box>
          <Box>
            <b>E-post:</b> {user?.email}
          </Box>
        </Box>

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
        <Heading as='h2' size='xl' pt={8} mb={0} maxWidth='95vw'>
          Registrerte brukere
        </Heading>
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
          {sortedUsers.map((user) => (
            <Box
              key={user?.user_id}
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
                  src={user?.picture}
                  alt={user?.name}
                  rounded='50%'
                  width={32}
                  mt={4}
                  mx={8}
                />
                <Text as='div' fontSize='lg' fontWeight='semibold' align='left'>
                  {user?.name}
                  {user?.app_metadata?.Role ? (
                    <Badge colorScheme='red'>ADMIN</Badge>
                  ) : (
                    ''
                  )}
                </Text>
              </Flex>

              <Box mx={8} mb={8}>
                <Stack
                  direction={['column', 'column', 'row', 'row']}
                  align='center'
                  justify='space-between'
                >
                  <Button variant='admin-button' w='100%' p={8}>
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
                  <Button variant='admin-button' w='100%' p={8}>
                    Bytt passord
                  </Button>
                  <Button variant='admin-button' w='100%' p={8}>
                    Endre
                    <wbr /> adminstatus
                  </Button>
                </Stack>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}
