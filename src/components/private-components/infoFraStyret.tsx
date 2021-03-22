import * as React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

function InfoFraStyret() {
  return (
    <Box
      bg='primaryLight'
      px={4}
      pt={8}
      pb={12}
      rounded='md'
      shadow='lg'
      align='left'
    >
      <Heading as='h1' size='2xl' textColor='black'>
        Informasjon fra styret
      </Heading>
      <Text as='p' fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
        På denne siden finner du nyttig informasjon fra styret. Ta kontakt hvis
        det er noe du savner, eller har tilbakemeldinger.
      </Text>
    </Box>
  );
}

export default InfoFraStyret;
