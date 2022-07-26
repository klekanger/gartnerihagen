import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
} from '@chakra-ui/react';
import { navigate } from 'gatsby';
import * as React from 'react';
import type { iErrorPageProps } from '../types/interfaces';

function ErrorPage({
  errorTitle = 'Noe gikk galt',
  errorMsg = 'Prøv igjen - eller ta kontakt med styret',
  backButton = false,
  backButtonLabel = 'Tilbake',
  backButtonLink = '/',
}: iErrorPageProps) {
  return (
    <Box
      maxWidth={['97%', '95%', '95%', '70%']}
      h='100vh'
      display='flex'
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
        {backButton && (
          <Button
            variant='standard'
            mt={8}
            onClick={() => navigate(`${backButtonLink}`)}
          >
            {backButtonLabel}
          </Button>
        )}
      </Alert>
    </Box>
  );
}

export default ErrorPage;

// TODO
// Make a prettier error page using Chakra UI Alert dialog
