import * as React from 'react';
import { useEffect, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { navigate } from 'gatsby';
import { IdentityContext } from '../context/identity-context';
import LoadingSpinner from '../components/loading-spinner';

interface IPrivateroute {
  component: any;
  location?: string;
  path?: string;
  postData?: any;
  title?: string;
  excerpt?: string;
}

function PrivateRoute({
  component: Component,
  location,
  ...rest
}: IPrivateroute) {
  const { user, isLoggingIn } = useContext(IdentityContext);

  if (isLoggingIn) {
    return (
      <Box>
        <LoadingSpinner spinnerMessage='Autentiserer bruker' />
      </Box>
    );
  }

  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
  }, [user, location]);

  return user ? <Component {...rest} /> : null;
}

export default PrivateRoute;
