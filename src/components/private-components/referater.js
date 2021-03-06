import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import DocumentLibrary from '../sections/documentLibrary';

export default function Referater({ title, excerpt, content, ...props }) {
  return (
    <Box
      w='95vw'
      ml='0'
      pt={[8, 16, 8, 16]}
      pb={[8, 8, 8, 16]}
      pr={['0', '0', '5vw', '30vw']}
      textAlign={['center', 'center', 'left', 'left']}
    >
      <Heading
        as='h1'
        size='2xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {title}
      </Heading>
      <Text>{excerpt}</Text>
      <DocumentLibrary data={content} />
    </Box>
  );
}
