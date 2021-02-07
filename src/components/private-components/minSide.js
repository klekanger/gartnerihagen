import React, { useContext } from 'react';
import Layout from '../layouts/layout';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { IdentityContext } from '../../context/identity-context';

export default function MinSide(props) {
  const { user, netlifyIdentity } = useContext(IdentityContext);

  return (
    <Layout>
      <Box
        w='95vw'
        ml='0'
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
          my={(4, 4, 8, 8)}
          align={['center', 'center', 'left', 'left']}
        >
          <Button
            minW={['40%', '40%', '20%', '20%']}
            minH='3rem'
            variant='standard'
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
      </Box>
    </Layout>
  );
}

// TODO
// Vise info for innlogget bruker
// Vise skjema for endring av opplysninger
// Mulighet for å endre passord
