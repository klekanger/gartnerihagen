//
// Gets a list of all the users

import { useApi } from './useApi';
import { useAuth0 } from '@auth0/auth0-react';

export const useGetAllUsers = () => {
  const { getAccessTokenWithPopup } = useAuth0();
  const opts = {
    method: 'GET',
    audience: 'https://useradmin.gartnerihagen-askim.no',
    scope: 'read:users read:roles read:role_members',
  };

  const { loading, error, refresh, data } = useApi(
    '/api/admin-users/get-users-in-role',
    opts
  );

  async function getTokenAndTryAgain() {
    try {
      await getAccessTokenWithPopup(opts);
      refresh();
    } catch (err) {
      console.error('Noe gikk galt:  ', err);
    }
  }

  return { data, loading, error, getToken: () => getTokenAndTryAgain() };
};
