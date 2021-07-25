import * as React from 'react';

import {
  Box,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react';

function ErrorPage({
  errorTitle = 'Noe gikk galt',
  errorMsg = 'Prøv igjen - eller ta kontakt med styret',
}) {
  return (
    <Box
      maxWidth={['97%', '95%', '95%', '70%']}
      h='100vh'
      d='flex'
      justifyContent='center'
    >
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        h={['55vh', '55vh', '65vh', '65vh']}
        w={['95vw', '80vw', '60vw', '50vw']}
        mt={16}
        rounded='md'
        shadow='lg'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          {errorTitle}
        </AlertTitle>
        <AlertDescription maxWidth='sm'>{errorMsg}</AlertDescription>
      </Alert>
    </Box>
  );
}

export default ErrorPage;

// TODO
// Make a prettier error page using Chakra UI Alert dialog
