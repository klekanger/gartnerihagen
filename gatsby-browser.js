import * as React from 'react';
import { wrapPageElement as wrap } from './src/chakra-wrapper';
import IdentityProvider from './src/context/identity-context';

export const wrapRootElement = ({ element }) => (
  <IdentityProvider>{element}</IdentityProvider>
);

export const wrapPageElement = wrap;

// TODO
// Add Auth 0
