// Client only route (static page is not generated on the server)
// Configured in gatsby-config.js, under the plugin "gatsby-plugin-create-client-paths"
import * as React from 'react';
import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { IdentityContext } from '../context/identity-context';
import { graphql, useStaticQuery } from 'gatsby';
import { Router } from '@reach/router';
import PrivateRoute from '../utils/privateRoute';
import Main from '../components/private-components/main';
import PrivateInfoArticle from '../components/private-components/privateInfoArticle';
import Referater from '../components/private-components/referater';
import Dokumenter from '../components/private-components/dokumenter';
import LoadingSpinner from '../components/loading-spinner';
import NotLoggedIn from '../components/private-components/notLoggedIn';

const Informasjon = () => {
  const data = useStaticQuery(graphql`
    query {
      privatePosts: allContentfulBlogPost(
        filter: { privatePost: { eq: true } }
      ) {
        nodes {
          author {
            firstName
            lastName
          }
          contentful_id
          createdAt(formatString: "DD.MM.YYYY")
          updatedAt(formatString: "DD.MM.YYYY")
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

  return (
    <Router>
      <PrivateRoute path='/informasjon' component={Main} />
      <PrivateRoute
        path='/informasjon/post/:slug'
        component={PrivateInfoArticle}
        postData={data}
      />
      <PrivateRoute
        path='/informasjon/referater/'
        component={Referater}
        title='Referater fra årsmøter'
        excerpt='På denne siden finner du referater fra alle tidligere årsmøter. Er det noe du savner, ta kontakt med styret.'
      />
      <PrivateRoute
        path='/informasjon/dokumenter/'
        component={Dokumenter}
        title='Dokumenter'
        excerpt='Her kan du laste ned relevante dokumenter. Er det noe du savner, ta kontakt med styret.'
      />
    </Router>
  );
};

export default Informasjon;
