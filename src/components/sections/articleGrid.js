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
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
        xl: "repeat(2, 1fr)",
      }}
      p="20px"
      gap={6}
      mb={16}
    >
      {postNodes.map((post) => (
        <Box
          w="auto"
          h="auto"
          bg="blue.500"
          p="16px"
          minWidth={["90vw", "90vw", "45vw", "45vw"]}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
          >
            {post.title}
          </Heading>
          <Text fontSize="md">
            {renderRichText(post.bodyText, renderRichTextOptions)}
          </Text>
        </Box>
      ))}
    </Grid>
  );
};

export default ArticleGrid;
