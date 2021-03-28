import * as React from 'react';
import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import { Router } from '@reach/router';
import { IdentityContext } from '../context/identity-context';
import PrivateRoute from '../utils/privateRoute';
import LoadingSpinner from '../components/loading-spinner';
import NotLoggedIn from '../components/private-components/notLoggedIn';
import CMSPreview from '../components/cmsPreview';

function Preview() {
  const data = useStaticQuery(graphql`
    query PreviewQuery {
      previewPosts: allContentfulBlogPost {
        nodes {
          author {
            firstName
            lastName
          }
          contentful_id
          createdAt
          updatedAt
          title
          slug
          excerpt {
            excerpt
          }
          bodyText {
            raw
            references {
              ... on ContentfulAsset {
                contentful_id
                __typename
                title
                description
                gatsbyImageData
              }
            }
          }
          privatePost
          featuredImage {
            description
            title
            gatsbyImageData
          }
        }
      }
    }
  `);

  const { user, isLoggingIn, netlifyIdentity } = useContext(IdentityContext);

  if (isLoggingIn) {
    return (
      <Box>
        <LoadingSpinner spinnerMessage='Autentiserer bruker' />
      </Box>
    );
  }

  if (!user) {
    netlifyIdentity.open();
    return <NotLoggedIn />;
  }

  // Prevent not logged in users from accessing private routes
  if (!user) {
    netlifyIdentity.open();
    return <NotLoggedIn />;
  }

  return (
    <Router>
      <PrivateRoute
        path='/preview/:slug'
        component={CMSPreview}
        postData={data}
      />
    </Router>
  );
}

export default Preview;

// TODO
//
// Set up preview access tokens etc.
// https://www.contentful.com/developers/docs/references/graphql/#/reference
