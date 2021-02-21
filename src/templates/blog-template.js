import React from 'react';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { format, parseISO } from 'date-fns';
import norwegian from 'date-fns/locale/nb';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import SEO from '../components/seo';

import renderRichTextOptions from '../theme/renderRichTextOptions';

export const query = graphql`
  query BlogPostQuery($id: String!) {
    contentfulBlogPost(contentful_id: { eq: $id }) {
      title
      createdAt
      updatedAt
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

  // Format article dates
  const createdAtFormated = format(parseISO(createdAt), 'dd. LLLL yyyy', {
    locale: norwegian,
  });
  const updatedAtFormated = format(parseISO(updatedAt), 'dd. LLLL yyyy', {
    locale: norwegian,
  });

  // Show publish date on article. Update date only if updated.
  const publishDate =
    createdAt !== updatedAt
      ? `Publisert: ${createdAtFormated} (oppdatert: ${updatedAtFormated})`
      : `Publisert: ${createdAtFormated}`;

  const topImage = featuredImage?.fluid ? (
    <Image
      as={GatsbyImage}
      fluid={featuredImage.fluid}
      shadow='lg'
      alt={featuredImage.description}
    />
  ) : null;

  return (
    <>
      <SEO
        title={title || null}
        image={featuredImage?.fluid?.src || null}
        description={excerpt?.excerpt || null}
      />
      <Box w='95vw' ml='0' pr={['0', '0', '5vw', '30vw']} pt={16}>
        <Heading
          as='h1'
          fontSize={['4xl', '4xl', '6xl', '6xl']}
          textAlign={['center', 'left', 'left', 'left']}
          pb={2}
        >
          {title}
        </Heading>
        {topImage}
        <Text as='div' my={[5, 10, 10, 10]}>
          {renderRichText(bodyText, renderRichTextOptions)}
        </Text>

        <Text
          fontSize={['sm', 'sm', 'sm', 'sm']}
          fontStyle='italic'
          pb={4}
          textAlign='left'
        >
          {publishDate}
        </Text>
      </Box>
    </>
  );
};

export default BlogPostTemplate;
