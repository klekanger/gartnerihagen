import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/react';
import PrivateArticle from './privateArticle';
import SEO from '../../components/seo';
import LoadingSpinner from '../loading-spinner';

export default function PrivateInfoArticlePage({ slug, id }) {
  const QUERY = gql`
    query PrivatePosts($id: String!) {
      post: blogPost(id: $id) {
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
    excerpt,
    featuredImage,
    sys: { createdAt, updatedAt },
    authorCollection,
  } = data?.post;

  const authors = authorCollection?.items ?? [];

  return (
    <>
      <SEO
        title={title || null}
        image={featuredImage.url || null}
        description={excerpt || null}
      />
      <PrivateArticle
        title={title}
        bodyText={bodyText}
        createdAt={createdAt}
        updatedAt={updatedAt}
        mainImage={featuredImage}
        author={authors}
        buttonLink='/informasjon'
      />
    </>
  );
}
