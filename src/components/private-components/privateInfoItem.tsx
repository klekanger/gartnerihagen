import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { Box, Heading } from '@chakra-ui/react';
import PrivateArticle from './privateArticle';
import LoadingSpinner from '../loading-spinner';

export default function PrivateInfoArticle({ slug, id }) {
  const QUERY = gql`
    query PrivatePosts($id: String!) {
      post: blogPost(id: $id) {
        title
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
                title
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
  });

  if (error) {
    return (
      <Box maxWidth={['97%', '95%', '95%', '70%']} py={[8, 12, 16, 24]}>
        <Heading as='h1'>Noe gikk galt</Heading>
      </Box>
    );
  }

  if (loading) {
    return <LoadingSpinner spinnerMessage='Laster inn artikkel...' />;
  }

  const {
    title,
    bodyText,
    featuredImage,
    sys: { createdAt, updatedAt },
    authorCollection,
  } = data?.post;

  console.log(bodyText.links);

  const authors = authorCollection?.items ?? [];

  return (
    <PrivateArticle
      title={title}
      bodyText={bodyText.json}
      createdAt={createdAt}
      updatedAt={updatedAt}
      mainImage={featuredImage}
      author={authors}
      buttonLink='/informasjon'
    />
  );
}
