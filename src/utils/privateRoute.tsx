import * as React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

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
  return <Component {...rest} />;
}

export default withAuthenticationRequired(PrivateRoute, {
  onRedirecting: () => <div>Sender deg videre til innloggingssiden...</div>,
});
