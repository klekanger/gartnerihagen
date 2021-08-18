import * as React from 'react';
import {
  Box,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react';

const NotLoggedInGiveConsent = (buttonLink) => {
  const { buttonLink: getTokenAndTryAgain } = buttonLink;

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
          Godkjenn tilgang til brukeradministrasjon
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          For å kunne administrere brukere, må du gi vår innloggingstjeneste
          Auth0 tillatelse til å aksessere din brukerkonto og epost-adresse.
        </AlertDescription>
        <Button
          variant='outline'
          colorScheme='blue'
          size='lg'
          rounded='md'
          ml={{ base: '0px', md: '20px', lg: '30px' }}
          mt={10}
          onClick={getTokenAndTryAgain}
          _hover={{ color: 'logoDarkGreen' }}
        >
          Klikk for å gi tillatelse
        </Button>
      </Alert>
    </Box>
  );
};

export default NotLoggedInGiveConsent;
