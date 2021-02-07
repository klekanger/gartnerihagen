import React, { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { IdentityContext } from '../context/identity-context';

function PrivateRoute(props) {
  const { user } = useContext(IdentityContext);
  const { component: Component, location, ...rest } = props;

  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
  }, [user, location]);

  return user ? <Component {...rest} /> : null;
}

export default PrivateRoute;
