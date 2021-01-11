import React from "react";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

import {
  documentToReactComponents,
  RenderText,
} from "@contentful/rich-text-react-renderer";

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";

import SEO from "../components/seo";
import Layout from "../components/layouts/layout";
import renderRichTextOptions from "../utils/renderRichTextOptions";

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
      bodyText {
        raw
        references {
          fluid {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      featuredImage {
        fluid {
          ...GatsbyContentfulFluid_withWebp
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
    featuredImage,
  } = data.contentfulBlogPost;

  const textToParse = JSON.parse(bodyText.raw);

  return (
    <Layout>
      <SEO />
      <Box width="90vw" m={10}>
        <Heading as="h1" m={5} size="3xl">
          {title}
        </Heading>

        <Image
          as={GatsbyImage}
          fluid={featuredImage.fluid}
          size="100%"
          rounded="0.5rem"
          shadow="lg"
          alt={featuredImage.description}
          ml={2}
        />

        <Text my={10} mx={10}>
          TEXT
          {documentToReactComponents(textToParse, renderRichTextOptions)}
        </Text>
        <Text>Publisert: {createdAt}</Text>
      </Box>
    </Layout>
  );
};

export default BlogPostTemplate;
