import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Article from '../components/article';
import ErrorPage from '../components/errorPage';

export const query = graphql`
  query PageQuery($id: String!) {
    contentfulSide(contentful_id: { eq: $id }) {
      pageTitle
      createdAt(formatString: "DD.MM.YYYY")
      updatedAt(formatString: "DD.MM.YYYY")
      excerpt {
        excerpt
      }
      pageText {
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
      pageImage {
        fluid {
          ...GatsbyContentfulFluid_withWebp
          src
        }
        title
        description
      }
    }
  }
`;

const BlogPostTemplate = ({ data, errors }) => {
  const {
    pageTitle,
    createdAt,
    updatedAt,
    pageText,
    pageImage,
    excerpt,
  } = data.contentfulSide;

  if (errors) {
    return <ErrorPage />;
  }

  return (
    <>
      <SEO
        title={pageTitle || null}
        image={pageImage?.fluid?.src || null}
        description={excerpt?.excerpt || null}
      />
      <Article
        title={pageTitle}
        bodyText={pageText}
        createdAt={createdAt}
        updatedAt={updatedAt}
        mainImage={pageImage}
      />
    </>
  );
};

export default BlogPostTemplate;
