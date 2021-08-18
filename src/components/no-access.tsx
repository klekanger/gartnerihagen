import * as React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Heading,
} from '@chakra-ui/react';

interface INoAccess {
  errorTitle?: string;
  errorMsg?: string;
}

function NoAccess({
  errorTitle = 'Du har ikke tilgang til dette',
  errorMsg = 'Noe gikk galt...',
}: INoAccess) {
  return (
    <Alert
      status='error'
      rounded='md'
      shadow='md'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      my={16}
      mx='auto'
      py={16}
      maxWidth={['97%', '95%', '95%', '60%']}
    >
      <AlertIcon boxSize={12} />
      <AlertTitle mt={8} mb={1} fontSize='lg'>
        {errorTitle}
      </AlertTitle>

      <AlertDescription maxWidth='sm'>{errorMsg}</AlertDescription>
    </Alert>
  );
}

export default NoAccess;
