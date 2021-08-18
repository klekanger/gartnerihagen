/**
 * useApi hook for accessing protected APIs with an access token.
 * https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#4-create-a-useapi-hook-for-accessing-protected-apis-with-an-access-token
 *
 * @param {string} url URL of the API you want to access
 * @param {Object} options Fetch options, like audience and scope
 *
 */

import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useApi = (url, options = {}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { audience, scope, ...fetchOptions } = options;

        const accessToken = await getAccessTokenSilently({ audience, scope });
        console.log(accessToken);
        const res = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setState({
          ...state,
          data: await res.json(),
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
