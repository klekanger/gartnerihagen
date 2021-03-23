import * as React from 'react';
import { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { IdentityContext } from '../context/identity-context';

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
  const { user } = useContext(IdentityContext);

  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
  }, [user, location]);

  return user ? <Component {...rest} /> : null;
}

export default PrivateRoute;
