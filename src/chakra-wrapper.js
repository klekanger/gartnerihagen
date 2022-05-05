// Root wrapper for Chakra UI.
// Necessary for accessing the Chakra UI Theme provider and customizing themes

import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import Layout from './components/layouts/layout';
import theme from './theme/';

export const wrapPageElement = ({ element }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>{element}</Layout>
    </ChakraProvider>
  );
};
