import * as React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Article from '../components/article';
import ErrorPage from '../components/errorPage';


export const query: void = graphql`
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
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
      pageImage {
        gatsbyImageData(layout: CONSTRAINED)
        file {
          url
        }
        title
        description
      }
    }
  }
`;

type ContentfulSideTypes = {
  pageTitle: string,
  createdAt: string,
  updatedAt: string,
  pageText: {
    raw: string
  },
  pageImage: any,
  excerpt: any,
}

const BlogPostTemplate = ({ data, errors }: { data: any, errors: any }) => {
  const {
    pageTitle,
    createdAt,
    updatedAt,
    pageText,
    pageImage,
    excerpt,
  } : ContentfulSideTypes = data.contentfulSide;

  if (errors) {
    return <ErrorPage />;
  }

  return (
    <>
      <SEO
        title={pageTitle || null}
        image={pageImage?.file?.url || null}
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
