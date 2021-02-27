import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const ErrorPage = ({ errorMsg = 'Noe gikk galt' }) => {
  return (
    <Box w='95vw' ml='0' pr={['0', '0', '5vw', '25vw']} pt={8} pb={16}>
      <Box pt={['8', '8', '16', '16']} textAlign='left'>
        <Heading as='h1' size='3xl' textColor='black' pb={16}>
          {errorMsg}
        </Heading>
      </Box>
    </Box>
  );
};

export default ErrorPage;
