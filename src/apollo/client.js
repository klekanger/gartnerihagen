import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://${process.env.CONTENTFUL_HOST}//spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries`,
    fetch,
  }),
  cache: new InMemoryCache(),
});
