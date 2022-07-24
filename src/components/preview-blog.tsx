import { gql, useQuery } from '@apollo/client';
import { Box, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';
import LoadingSpinner from './loading-spinner';
import PrivateArticle from './private-components/privateArticle';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

import { PreviewBlogProps } from '../types/interfaces';

const previewClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.GATSBY_CONTENTFUL_SPACE_ID}`,
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

function PreviewBlog({ id }: PreviewBlogProps) {
  const QUERY = gql`
    query Post($id: String!) {
      post: blogPost(preview: true, id: $id) {
        title
        excerpt
        sys {
          createdAt: firstPublishedAt
          updatedAt: publishedAt
        }
        authorCollection {
          items {
            firstName
            lastName
          }
        }
        bodyText {
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
        featuredImage {
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
    client: previewClient,
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

  if (!data?.post) {
    return (
      <Box maxWidth={['97%', '95%', '95%', '70%']} py={[8, 12, 16, 24]}>
        <Heading as='h1'>Artikkel med ID ${id} eksisterer ikke</Heading>
      </Box>
    );
  }

  const {
    title,
    bodyText,
    excerpt,
    featuredImage,
    sys: { createdAt, updatedAt },
    authorCollection,
  } = data?.post;

  const authors = authorCollection?.items ?? [];

  // Format the dates shown at the bottom of every article page
  const publishDate: string =
    createdAt !== updatedAt
      ? `Publisert: ${createdAt} (oppdatert: ${updatedAt})`
      : `Publisert: ${createdAt}`;

  return (
    <PrivateArticle
      title={title}
      bodyText={bodyText}
      createdAt={createdAt}
      updatedAt={updatedAt}
      mainImage={featuredImage}
      author={authors}
      buttonLink='/informasjon'
    />
  );
}

export default PreviewBlog;
