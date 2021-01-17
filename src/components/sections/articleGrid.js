import React from "react";
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby";
import GatsbyImage from "gatsby-image";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Image, Heading, Text, Grid, Link } from "@chakra-ui/react";

const ArticleGrid = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allContentfulBlogPost {
        nodes {
          contentful_id
          createdAt
          updatedAt
          title
          slug
          excerpt {
            excerpt
          }
          author {
            firstName
            lastName
          }
          featuredImage {
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
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
      maxWidth="95vw"
      minHeight="45vh"
    >
      {postNodes.map((post) => (
        <Box key={post.contentful_id}>
          <Image
            as={GatsbyImage}
            fluid={post.featuredImage.fluid}
            rounded="0.5rem"
            shadow="lg"
            height={{
              sm: "40vh",
              md: "40vh",
              lg: "40vh",
              xl: "50vh",
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
            <Link
              as={GatsbyLink}
              to={`/blog/${post.slug}`}
              _hover={{ textDecor: "none", color: "blue.700" }}
            >
              {post.title}
            </Link>
          </Heading>
          <Text fontSize="md" textAlign="left">
            {post.excerpt.excerpt}
          </Text>
          <Text textAlign="left" py={3} _hover={{ color: "blue.700" }}>
            <Link
              as={GatsbyLink}
              to={`/blog/${post.slug}`}
              _hover={{ textDecor: "none" }}
            >
              Les mer <ChevronRightIcon />
            </Link>
          </Text>
        </Box>
      ))}
    </Grid>
  );
};

export default ArticleGrid;
