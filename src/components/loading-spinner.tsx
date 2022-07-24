import { Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { ILoadingSpinner } from '../types/interfaces';
import Container from './layouts/container';

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
