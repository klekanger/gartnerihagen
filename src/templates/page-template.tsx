import * as React from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import SEO from '../components/seo';
import Article from '../components/article';
import ErrorPage from '../components/errorPage';

interface IContentfulSide {
  data: {
    contentfulSide: {
      pageTitle: string;
      createdAt: string;
      updatedAt: string;
      pageText: {
        raw: string;
      };
      excerpt: any;
      title: string;
      bodyText: {
        raw: string;
      };
      pageImage: {
        description: string;
        title: string;
        file: {
          url: string;
        };
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
  errors: any;
}

export default function BlogPostTemplate({
  data: { contentfulSide },
  errors,
}: IContentfulSide) {
  if (errors) {
    return <ErrorPage />;
  }

  const { pageTitle, createdAt, updatedAt, pageText, pageImage, excerpt } =
    contentfulSide;

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
        buttonLink='/'
      />
    </>
  );
}

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
