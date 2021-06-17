import * as React from 'react';
import { navigate } from 'gatsby';
import { ApolloWrapper } from './src/apollo/apollo-wrapper';
import { Auth0Provider } from '@auth0/auth0-react';
import { wrapPageElement as wrap } from './src/chakra-wrapper';

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || '/', { replace: true });
};

// Wrap page element in Chakra Provider and Layout component
export const wrapPageElement = wrap;

// Wrap root element with the necessery things to get auth and Apollo client to work
export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={process.env.GATSBY_AUTH0_DOMAIN}
    clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloWrapper>{element}</ApolloWrapper>
  </Auth0Provider>
);
