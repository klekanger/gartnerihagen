import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";

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
          createdAt
          updatedAt
          title
          excerpt {
            excerpt
          }
          author {
            firstName
            lastName
          }
          featuredImage {
            fluid(maxWidth: 1000) {
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
      gap={10}
      mb={16}
      maxWidth="85vw"
      minHeight="45vh"
    >
      {postNodes.map((post) => (
        <Box key={post.contentful_id}>
          <Image
            as={GatsbyImage}
            fluid={post.featuredImage.fluid}
            rounded="0.5rem"
            shadow="lg"
            maxHeight="50vh"
            minHeight={{
              base: "40vh",
              sm: "40vh",
              md: "40vh",
              lg: "30vh",
              xl: "40vh",
            }}
            mb={5}
            alt={post.featuredImage.description}
          />
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
            {post.excerpt.excerpt}
          </Text>
        </Box>
      ))}
    </Grid>
  );
};

export default ArticleGrid;
