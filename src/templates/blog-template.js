import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import ErrorPage from '../components/errorPage';
import Article from '../components/article';

export const query = graphql`
  query BlogPostQuery($id: String!) {
    contentfulBlogPost(contentful_id: { eq: $id }) {
      title
      createdAt(formatString: "DD.MM.YYYY")
      updatedAt(formatString: "DD.MM.YYYY")
      author {
        firstName
        lastName
      }
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

      featuredImage {
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
    title,
    createdAt,
    updatedAt,
    bodyText,
    excerpt,
    featuredImage,
  } = data.contentfulBlogPost;

  if (errors) {
    return <ErrorPage />;
  }

  return (
    <>
      <SEO
        title={title || null}
        image={featuredImage?.fluid?.src || null}
        description={excerpt?.excerpt || null}
      />
      <Article
        title={title}
        bodyText={bodyText}
        createdAt={createdAt}
        updatedAt={updatedAt}
        mainImage={featuredImage}
      />
    </>
  );
};

export default BlogPostTemplate;
