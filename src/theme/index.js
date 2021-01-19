// Theming for Chakra UI

import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides

// Component style overrides
import Button from "./components/button";
import Heading from "./components/heading";

const overrides = {
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },

  /*   fonts: {
    heading: "Open Sans",
    body: "Raleway",
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
 */
  styles,

  components: {
    Button,
    Heading,
  },
};

const theme = extendTheme(overrides);

export default theme;
