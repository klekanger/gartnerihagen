// Client only route (static page is not generated on the server)
// Configured in gatsby-config.js, under the plugin "gatsby-plugin-create-client-paths"
import * as React from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { Router } from '@reach/router';
import PrivateRoute from '../utils/privateRoute';

import InfoPage from '../components/private-components/informasjon';
import PrivateInfoArticle from '../components/private-components/privateInfoArticle';
import Referater from '../components/private-components/referater';
import Dokumenter from '../components/private-components/dokumenter';

import LoadingSpinner from '../components/loading-spinner';
import NotLoggedIn from '../components/private-components/notLoggedIn';

const Informasjon = () => {
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
    return <NotLoggedIn />;
  }

  return (
    <Router>
      <PrivateRoute path='/informasjon' component={InfoPage} />
      <PrivateRoute
        path='/informasjon/post/:slug'
        component={PrivateInfoArticle}
      />
      <PrivateRoute
        path='/informasjon/referater/'
        component={Referater}
        title='Referater fra årsmøter'
        excerpt='På denne siden finner du referater fra alle tidligere årsmøter. Er det noe du savner, ta kontakt med styret.'
      />
      <PrivateRoute
        path='/informasjon/dokumenter/'
        component={Dokumenter}
        title='Dokumenter'
        excerpt='Her kan du laste ned relevante dokumenter. Er det noe du savner, ta kontakt med styret.'
      />
    </Router>
  );
};

export default Informasjon;
