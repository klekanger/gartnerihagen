// Theming for Chakra UI

import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides
import borders from "./foundations/borders";
import typography from "./foundations/typography";

// Component style overrides
import Button from "./components/button";
import Heading from "./components/heading";

const overrides = {
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  styles,
  borders,
  typography,
  components: {
    Button,
    Heading,
  },
};

const theme = extendTheme(overrides);

export default theme;
