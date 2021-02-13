import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

export default function NotLoggedIn() {
  return (
    <Box h='70vh' pt='10vh'>
      <Heading as='h1'>Du må være logget inn for å se denne siden.</Heading>
      <Text as='p'>Ta kontakt med styret for å få konto for innlogging.</Text>
    </Box>
  );
}
