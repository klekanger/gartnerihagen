import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import renderRichTextOptions from "../../utils/renderRichTextOptions";

import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
  Grid,
} from "@chakra-ui/react";

const ArticleGrid = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allContentfulBlogPost {
        nodes {
          contentful_id
          author {
            firstName
            lastName
          }
          createdAt
          updatedAt
          title
          bodyText {
            raw
            references {
              ... on ContentfulAsset {
                contentful_id
                fluid(maxWidth: 2560) {
                  srcWebp
                }
              }
            }
          }
          featuredImage {
            fluid {
              src
            }
            description
            title
          }
        }
      }
    }
  `);

  const postNodes = data.posts.nodes || [];

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(1, 1fr)",
        lg: "repeat(2, 1fr)",
        xl: "repeat(2, 1fr)",
      }}
      py={8}
      gap={6}
      mb={16}
      maxWidth="85vw"
      minHeight="45vh"
    >
      {postNodes.map((post) => (
        <Box maxWidth="100%" p={4} rounded="0.5rem" shadow="lg">
          <Heading
            as="h1"
            size="xl"
            mb={4}
            fontWeight="bold"
            color="primary.800"
            textAlign="left"
          >
            {post.title}
          </Heading>
          <Text fontSize="md" textAlign="left">
            {renderRichText(post.bodyText, renderRichTextOptions)}
          </Text>
        </Box>
      ))}
    </Grid>
  );
};

export default ArticleGrid;
