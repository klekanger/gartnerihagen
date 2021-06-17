import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

export const ApolloWrapper = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
