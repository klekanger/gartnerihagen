import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Router } from '@reach/router';
import PrivateRoute from '../utils/privateRoute';
import NotLoggedIn from '../components/private-components/notLoggedIn';
import LoadingSpinner from '../components/loading-spinner';
import UserAdminPage from '../components/private-components/userAdminPage';

function UserAdmin() {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return <NotLoggedIn />;
  }

  return (
    <Router>
      <PrivateRoute path='/user-admin' component={UserAdminPage} />
    </Router>
  );
}

export default UserAdmin;
