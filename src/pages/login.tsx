import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LoadingSpinner from '../components/loading-spinner';

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
    return <LoadingSpinner />;
  }

  return <h1>...</h1>;
};

export default Login;
