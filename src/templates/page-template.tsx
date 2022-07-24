import { graphql } from 'gatsby';
import * as React from 'react';
import Article from '../components/article';
import ErrorPage from '../components/errorPage';
import Container from '../components/layouts/container';
import SEO from '../components/seo';
import { IContentfulSide } from '../types/interfaces';

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

      <Container>
        <Article
          title={pageTitle}
          bodyText={pageText}
          createdAt={createdAt}
          updatedAt={updatedAt}
          mainImage={pageImage}
          buttonLink='/'
        />
      </Container>
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
            gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.6)
          }
        }
      }
      pageImage {
        gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.6)
        file {
          url
        }
        title
        description
      }
    }
  }
`;
