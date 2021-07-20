import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

export const ApolloWrapper = (props) => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
);
