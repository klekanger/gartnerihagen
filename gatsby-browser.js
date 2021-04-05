import * as React from 'react';
import { wrapPageElement as wrap } from './src/chakra-wrapper';
import IdentityProvider from './src/context/identity-context';

export const wrapRootElement = ({ element }) => (
  <IdentityProvider>{element}</IdentityProvider>
);

export const wrapPageElement = wrap;

// TODO
//
// Auth0 - protecting a route in a Gatsby app:
// https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#2-protecting-a-route-in-a-gatsby-app
//
