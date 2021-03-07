import React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Box, Button, Heading, Text, Image } from '@chakra-ui/react';
import SEO from '../components/seo';
import ErrorPage from '../components/errorPage';
import renderRichTextOptions from '../theme/renderRichTextOptions';

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

  const publishDate =
    createdAt !== updatedAt
      ? `Publisert: ${createdAt} (oppdatert: ${updatedAt})`
      : `Publisert: ${createdAt}`;

  const topImage = featuredImage?.fluid ? (
    <Image
      as={GatsbyImage}
      fluid={{ ...featuredImage.fluid, aspectRatio: 16 / 10 }}
      rounded='md'
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
      <Box maxWidth={['97%', '95%', '95%', '70%']} pt={[8, 12, 16, 24]}>
        <Heading
          as='h1'
          fontSize={['4xl', '6xl', '6xl', '7xl']}
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
          pb={[4, 16]}
          textAlign='left'
        >
          {publishDate}
        </Text>
        <Box align='left'>
          <Button
            as={GatsbyLink}
            to={`/blog/`}
            variant='standard'
            mb={16}
            _hover={{ textDecor: 'none' }}
          >
            Gå tilbake
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default BlogPostTemplate;
