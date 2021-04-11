import * as React from 'react';
import { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { useAuth0 } from '@auth0/auth0-react';

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
  const { user, isAuthenticated } = useAuth0();
  console.log('Is authenticated: ', isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/`);
    }
  }, [user, isAuthenticated]);

  return isAuthenticated ? <Component {...rest} /> : null;
}

export default PrivateRoute;
