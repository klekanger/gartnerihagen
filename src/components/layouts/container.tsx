// Default container for default page width
// Wrap articles etc. in this one and everything should be nice and centered with the same width
import { Box } from '@chakra-ui/react';
import * as React from 'react';

export default function Container({ children, ...rest }) {
  return (
    <Box
      maxWidth={['97%', '95%', '95%', '70%', '50%']}
      pt={4}
      m='auto'
      {...rest}
    >
      {children}
    </Box>
  );
}
