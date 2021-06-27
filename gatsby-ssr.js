import * as React from 'react';
import { wrapPageElement as wrap } from './src/chakra-wrapper';
import { ApolloWrapper } from './src/apollo/apollo-wrapper';

// Wrap page element in Chakra Provider and Layout component
export const wrapPageElement = wrap;

export const wrapRootElement = ({ element }) => (
  <ApolloWrapper>{element}</ApolloWrapper>
);
