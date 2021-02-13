// Root wrapper for Chakra UI.
// Necessary for accessing the Chakra UI Theme provider and customizing themes

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme/';

// Define colors for our theme.Extends Chakra UI default theme

export const wrapPageElement = ({ element }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {element}
    </ChakraProvider>
  );
};

// TODO
// Move Layout component from pages to this wrapper component
