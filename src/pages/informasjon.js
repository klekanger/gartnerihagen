// Client only route (static page is not generated on the server)
// Configured in gatsby-config.js, under the plugin "gatsby-plugin-create-client-paths"

import React, { useContext } from 'react';
import { IdentityContext } from '../context/identity-context';
import { graphql, useStaticQuery } from 'gatsby';
import { Router } from '@reach/router';
import PrivateRoute from '../utils/privateRoute';
import Main from '../components/private-components/main';
import PrivateInfo from '../components/private-components/privateInfo';
import Referater from '../components/private-components/referater';
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
                fluid {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
          privatePost
          featuredImage {
            fluid {
              ...GatsbyContentfulFluid_withWebp
              src
            }
          }
        }
      }
    }
  `);

  const { user, netlifyIdentity } = useContext(IdentityContext);

  if (!user) {
    netlifyIdentity.open();
    return <NotLoggedIn />;
  }

  return (
    <Router>
      <PrivateRoute path='/informasjon' component={Main} />
      <PrivateRoute
        path='/informasjon/post/:slug'
        component={PrivateInfo}
        postData={data}
      />
      <PrivateRoute
        path='/informasjon/referater'
        component={Referater}
        title='Referater fra årsmøter'
        excerpt='På denne siden finner du referater fra alle tidligere årsmøter. Er det noe du savner, ta kontakt med styret.'
      />
    </Router>
  );
};

export default Informasjon;
