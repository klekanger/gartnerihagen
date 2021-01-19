// Root wrapper for Chakra UI.
// Necessary for accessing the Chakra UI Theme provider and customizing themes

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
/* import { Fonts } from "./theme/fonts.js"; */

import theme from "./theme/";

// Define colors for our theme.Extends Chakra UI default theme

export const wrapPageElement = ({ element }) => {
  console.log(theme);
  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* <Fonts /> */}
      {element}
    </ChakraProvider>
  );
};
