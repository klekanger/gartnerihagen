import * as React from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { Router } from '@reach/router';
import PrivateRoute from '../utils/privateRoute';
import PreviewBlog from '../components/preview-blog';
import PreviewPage from '../components/preview-page';
import LoadingSpinner from '../components/loading-spinner';
import NotLoggedIn from '../components/notLoggedIn';

export default function Preview() {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return (
      <Box>
        <LoadingSpinner spinnerMessage='Autentiserer bruker' />
      </Box>
    );
  }

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <NotLoggedIn
          description={`
            Du må være logget inn for å kunne forhåndsvise ikke-publisert innhold. 

            Hvis du ikke har brukerkonto, ta kontakt med styret.`}
        />
      </>
    );
  }

  return (
    <Router>
      <PrivateRoute path='/preview/blog/:id' component={PreviewBlog} />
      <PrivateRoute path='/preview/page/:id' component={PreviewPage} />
    </Router>
  );
}
