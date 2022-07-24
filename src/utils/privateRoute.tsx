import { withAuthenticationRequired } from '@auth0/auth0-react';
import * as React from 'react';
import { IPrivateroute } from '../types/interfaces';

function PrivateRoute({ component: Component, ...rest }: IPrivateroute) {
  return <Component {...rest} />;
}

export default withAuthenticationRequired(PrivateRoute);
