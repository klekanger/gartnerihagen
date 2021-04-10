import * as React from 'react';
import { wrapPageElement as wrap } from './src/chakra-wrapper';
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || '/', { replace: true });
};

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    clientId={process.env.AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    {element}
  </Auth0Provider>
);

export const wrapPageElement = wrap;
