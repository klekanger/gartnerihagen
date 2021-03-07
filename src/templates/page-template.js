import React from 'react';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import SEO from '../components/seo';
import ErrorPage from '../components/errorPage';
import renderRichTextOptions from '../theme/renderRichTextOptions';

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

  // Show publish date on article. Update date only if updated.
  const publishDate =
    createdAt !== updatedAt
      ? `Publisert: ${createdAt} (oppdatert: ${updatedAt})`
      : `Publisert: ${createdAt}`;

  const topImage = pageImage?.fluid ? (
    <Image
      as={GatsbyImage}
      fluid={{ ...pageImage.fluid, aspectRation: 16 / 10 }}
      rounded='md'
      shadow='lg'
      alt={pageImage.description}
    />
  ) : null;

  return (
    <>
      <SEO
        title={pageTitle || null}
        image={pageImage?.fluid?.src || null}
        description={excerpt?.excerpt || null}
      />
      <Box w='95vw' ml='0' pr={['0', '0', '5vw', '25vw']} pt={16}>
        <Heading
          as='h1'
          fontSize={['4xl', '4xl', '6xl', '6xl']}
          textAlign={['center', 'left', 'left', 'left']}
          pb={2}
        >
          {pageTitle}
        </Heading>
        {topImage}
        <Text as='div' my={[5, 10, 10, 10]}>
          {renderRichText(pageText, renderRichTextOptions)}
        </Text>
        <Text
          fontSize={['sm', 'sm', 'sm', 'sm']}
          fontStyle='italic'
          pb={[4, 16]}
          textAlign='left'
        >
          {publishDate}
        </Text>
      </Box>
    </>
  );
};

export default BlogPostTemplate;
