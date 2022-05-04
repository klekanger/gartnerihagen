import { useAuth0 } from '@auth0/auth0-react';
import { Box, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';

export default function DocumentEditor() {
  const { user, isAuthenticated, error: authError } = useAuth0();
  const userRoles = user['https:/gartnerihagen-askim.no/roles'];
  const isAdmin = userRoles.includes('admin');
  const isEditor = userRoles.includes('editor');

  if (!isAuthenticated) {
    return <h1>Ikke autentisert</h1>;
  }

  if (!(isEditor || isAdmin)) {
    return <h1>Ikke redaktør- eller admin-tilgang</h1>;
  }

  return (
    <Box
      as='article'
      bg='primaryLight'
      px={4}
      rounded='md'
      shadow='lg'
      maxW={['97%', '95%', '95%', '70%', '50%']}
      my={8}
      pt={[8, 16, 8, 16]}
      pb={[8, 8, 8, 16]}
      textAlign='left'
      fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
    >
      <Heading as='h1' size='xl' textColor='black' textAlign='center'>
        Endre eller last opp dokumenter
      </Heading>

      <Text py={4}>
        Endring eller opplasting av dokumenter må foreløpig gjøres i
        publiseringsverktøyet vårt,{' '}
        <a
          href={`https://app.contentful.com/spaces/${process.env.GATSBY_CONTENTFUL_SPACE_ID}/home`}
          target='_blank'
          rel='noreferrer noopener'
        >
          <em>Contentful</em>.
        </a>
      </Text>
      <Text pb={4}>
        Du må ha en bruker på boligsameiets sider som har redaktør- eller
        admin-tilgang for å kunne laste opp dokumenter. I tillegg må du ha
        tilgang til sameiets konto i Contentful (dette er ikke den samme som du
        bruker for å logge inn på sameiets nettsider).
      </Text>
      <Text pb={4}>
        <strong>
          <a
            href={`https://app.contentful.com/spaces/${process.env.GATSBY_CONTENTFUL_SPACE_ID}/entries/3ZMDi88bv5KLPFanE7JxPa`}
            target='_blank'
            rel='noreferrer noopener'
          >
            Klikk her
          </a>
        </strong>{' '}
        for å gå til publiseringsverktøyet.
      </Text>
      <Text>Ta kontakt med styret ved spørsmål.</Text>
    </Box>
  );
}
