import { graphql } from 'gatsby';
import * as React from 'react';
import Article from '../components/article';
import ErrorPage from '../components/errorPage';
import Container from '../components/layouts/container';
import SEO from '../components/seo';
import type { IContentfulBlogPost } from '../types/interfaces';

export default function BlogPostTemplate({
  data: { contentfulBlogPost },
  errors,
}: IContentfulBlogPost) {
  if (errors) {
    return <ErrorPage />;
  }

  const {
    title,
    author,
    createdAt,
    updatedAt,
    bodyText,
    excerpt,
    featuredImage,
  } = contentfulBlogPost;

  return (
    <>
      <SEO
        title={title}
        image={featuredImage?.file?.url || null}
        description={excerpt?.excerpt}
      />
      <Container>
        <Article
          title={title}
          bodyText={bodyText}
          createdAt={createdAt}
          updatedAt={updatedAt}
          mainImage={featuredImage}
          author={author}
          buttonLink='/blog'
        />
      </Container>
    </>
  );
}

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
            gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.6)
          }
        }
      }

      featuredImage {
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
