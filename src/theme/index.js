// Theming for Chakra UI

import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Custom colors
import colors from "./colors";

// Foundational style overrides

// Component style overrides
import Button from "./components/button";
import Heading from "./components/heading";

const overrides = {
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  breakpoints: {
    sm: "30em",
    md: "52em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  styles,
  colors,
  components: {
    Button,
    Heading,
  },
};

const theme = extendTheme(overrides);

export default theme;
