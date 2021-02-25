// Root wrapper for Chakra UI.
// Necessary for accessing the Chakra UI Theme provider and customizing themes

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/layouts/layout'; // We're going with the standard Chakra-fonts
/* import { Fonts } from './theme/fonts'; */ import theme from './theme/';

export const wrapPageElement = ({ element }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* <Fonts /> */}
      <Layout>{element}</Layout>
    </ChakraProvider>
  );
};

// TODO
// Move Layout component from pages to this wrapper component
