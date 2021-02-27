// Theming for Chakra UI

import { extendTheme } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

// Custom colors
import colors from './colors';

// Component style overrides
import Button from './components/button';
import Heading from './components/heading';
import Text from './components/text';

const overrides = {
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
  breakpoints: {
    sm: '30em',
    md: '52em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  styles,
  colors,
  /* fonts: {
    heading: 'Open Sans',
    body: 'Source Sans Pro',
  }, */
  components: {
    Button,
    Heading,
    Text,
  },
};

const theme = extendTheme(overrides);

export default theme;

// TODO
// Finne fornuftige linjeavstander og definere dette på tvers av alle komponenter
// Definere fonter og fontstørrelser
