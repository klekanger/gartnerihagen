import React from "react";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";
import { format, parseISO } from "date-fns";
import norwegian from "date-fns/locale/nb";

import { renderRichText } from "gatsby-source-contentful/rich-text";

import { Box, Heading, Text, Image } from "@chakra-ui/react";

import SEO from "../components/seo";
import Layout from "../components/layouts/layout";
import renderRichTextOptions from "../theme/renderRichTextOptions";

export const query = graphql`
  query PageQuery($id: String!) {
    contentfulSide(contentful_id: { eq: $id }) {
      pageTitle
      createdAt
      updatedAt
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

  // Format article dates
  const createdAtFormated = format(parseISO(createdAt), "dd. LLLL yyyy", {
    locale: norwegian,
  });
  const updatedAtFormated = format(parseISO(updatedAt), "dd. LLLL yyyy", {
    locale: norwegian,
  });

  // Show publish date on article. Update date only if updated.
  const publishDate =
    createdAt !== updatedAt
      ? `Publisert: ${createdAtFormated} (oppdatert: ${updatedAtFormated})`
      : `Publisert: ${createdAtFormated}`;

  const topImage = pageImage?.fluid ? (
    <Image
      as={GatsbyImage}
      fluid={pageImage.fluid}
      size="100%"
      shadow="lg"
      alt={pageImage.description}
      ml={2}
    />
  ) : null;

  return (
    <Layout>
      <SEO
        title={pageTitle || null}
        image={pageImage?.fluid?.src || null}
        description={excerpt?.excerpt || null}
      />
      <Box width="90vw" m={10}>
        <Heading as="h1" size="4xl" m={5}>
          {pageTitle}
        </Heading>
        {topImage}
        <Text as="div" my={10} mx={10}>
          {renderRichText(pageText, renderRichTextOptions)}
        </Text>
        <Text fontSize="sm" fontStyle="italic">
          {publishDate}
        </Text>
      </Box>
    </Layout>
  );
};

export default BlogPostTemplate;
