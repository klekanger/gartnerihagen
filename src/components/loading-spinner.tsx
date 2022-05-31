import React from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import Container from './layouts/container';

interface ILoadingSpinner {
  spinnerMessage?: string;
}

export default function LoadingSpinner({ spinnerMessage }: ILoadingSpinner) {
  return (
    <Container h='100vh' pt={4} textAlign='center'>
      <Spinner
        mt='30vh'
        thickness='8px'
        speed='0.65s'
        emptyColor='gray.200'
        color='primaryButton'
        size='xl'
        label={spinnerMessage || 'Laster side'}
      />
      {spinnerMessage && <Text>{spinnerMessage}</Text>}
    </Container>
  );
}
