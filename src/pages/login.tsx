import * as React from 'react';
import { useEffect } from 'react';
import { navigate } from 'gatsby';
import LoadingSpinner from '../components/loading-spinner';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      navigate('/min-side');
    }
  }, []);

  return (
    <Box h='70vh' pt='10vh'>
      <Heading as='h1'>
        Hvis du ikke er logget inn, vil du bli sendt videre til
        innloggingssiden.
      </Heading>
      <Text as='p'>Ved problemer, ta kontakt med styret.</Text>
    </Box>
  );
};

export default Login;
