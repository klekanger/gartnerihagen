// Client only route (static page is not generated on the server)
// Configured in gatsby-config.js, under the plugin "gatsby-plugin-create-client-paths"

import { useAuth0 } from '@auth0/auth0-react';
import { Router } from '@reach/router';
import * as React from 'react';
import LoadingSpinner from '../components/loading-spinner';
import NotLoggedIn from '../components/notLoggedIn';
import DocumentEditor from '../components/private-components/documentEditor';
import PrivateRoute from '../utils/privateRoute';

const EditDocuments = () => {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  // Prevent not logged in users from accessing private routes
  if (!isAuthenticated) {
    console.log(isLoading, isAuthenticated, error);
    loginWithRedirect();
    return <NotLoggedIn />;
  }

  return (
    <Router>
      <PrivateRoute path='/edit-documents' component={DocumentEditor} />
    </Router>
  );
};

export default EditDocuments;
