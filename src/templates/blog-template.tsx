import * as React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import ErrorPage from '../components/errorPage';
import Article from '../components/article';

export const query: void = graphql`
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
            gatsbyImageData(
              layout: CONSTRAINED
              aspectRatio: 1.6)
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

interface IContentfulBlogPost  {
  data: {
    contentfulBlogPost: {
      title: string,
      createdAt: string,
      updatedAt: string,
      bodyText: {
        raw: string,
      },
      excerpt: any,
      featuredImage: {
        description: string,
        title: string,
        file: {
          url: string
        },
        gatsbyImageData: JSON
      } 
    }
  }
  errors: any
}

const BlogPostTemplate = ({ data: {contentfulBlogPost}, errors }: IContentfulBlogPost) => {

  if (errors) {
    return <ErrorPage />;
  }

  const {
    title ,
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
