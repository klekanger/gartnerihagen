import * as React from 'react';
import {
  Box,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react';
import SEO from './seo';
import { useAuth0 } from '@auth0/auth0-react';

export default function NotLoggedIn() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box
      maxWidth={['97%', '95%', '95%', '70%']}
      h='100vh'
      d='flex'
      justifyContent='center'
    >
      <Alert
        status='info'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        h={['55vh', '55vh', '65vh', '65vh']}
        w={['95vw', '80vw', '60vw', '50vw']}
        mt={16}
        rounded='md'
        shadow='lg'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Logg inn for å se denne siden
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Du må logge inn for å se informasjon beregnet på beboere i
          Boligsameiet Gartnerihagen. Her finner du artikler, vedtekter,
          dokumentasjon, referater fra årsmøter og annen nyttig informasjon.{' '}
          <br />
          <br />
          Hvis du ikke har brukerkonto, ta kontakt med styret.
        </AlertDescription>
        <Button
          variant='outline'
          colorScheme='blue'
          size='lg'
          rounded='md'
          ml={{ base: '0px', md: '20px', lg: '30px' }}
          mt={10}
          onClick={() =>
            loginWithRedirect({
              ui_locales: 'nb',
            })
          }
          _hover={{ color: 'logoDarkGreen' }}
        >
          Klikk for å logge inn
        </Button>
      </Alert>
    </Box>
  );
}
