import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import { Box, Heading, Text } from '@chakra-ui/react';
import fetch from 'cross-fetch';
import * as React from 'react';
import type { PreviewPageProps } from '../types/interfaces';
import LoadingSpinner from './loading-spinner';
import PrivateArticle from './private-components/privateArticle';

const previewPageClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.GATSBY_CONTENTFUL_SPACE_ID}`,
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

function PreviewPage({ id }: PreviewPageProps) {
  const QUERY = gql`
    query PageQuery($id: String!) {
      page(preview: true, id: $id) {
        pageTitle
        excerpt
        sys {
          createdAt: firstPublishedAt
          updatedAt: publishedAt
        }
        pageText {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                title
                description
                url
              }
            }
          }
        }
        pageImage {
          title
          description
          url
        }
      }
    }
  `;

  // ID of article is passed in from Reach router and used in Apollo query above
  // to retrieve the correct post
  const { data, error, loading } = useQuery(QUERY, {
    variables: { id },
    client: previewPageClient,
  });

  if (loading) {
    return <LoadingSpinner spinnerMessage='Laster inn artikkel...' />;
  }

  if (error) {
    return (
      <Box maxWidth={['97%', '95%', '95%', '70%']} py={[8, 12, 16, 24]}>
        <Heading as='h1'>Noe gikk galt</Heading>
        <Text>{error?.message}</Text>
      </Box>
    );
  }

  if (!data?.page) {
    return (
      <Box maxWidth={['97%', '95%', '95%', '70%']} py={[8, 12, 16, 24]}>
        <Heading as='h1'>Side med ID ${id} eksisterer ikke</Heading>
      </Box>
    );
  }

  const {
    pageTitle,
    pageText,
    excerpt,
    pageImage,
    sys: { createdAt, updatedAt },
  } = data?.page;

  // Format the dates shown at the bottom of every article page
  const publishDate: string =
    createdAt !== updatedAt
      ? `Publisert: ${createdAt} (oppdatert: ${updatedAt})`
      : `Publisert: ${createdAt}`;

  return (
    <PrivateArticle
      title={pageTitle}
      bodyText={pageText}
      createdAt={createdAt}
      updatedAt={updatedAt}
      mainImage={pageImage}
      buttonLink='/informasjon'
    />
  );
}

export default PreviewPage;
