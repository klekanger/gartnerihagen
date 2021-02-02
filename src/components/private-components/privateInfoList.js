import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";

import { Box, Image, Heading, Text } from "@chakra-ui/react";

const PrivateInfoList = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allContentfulBlogPost(filter: { privatePost: { eq: true } }) {
        nodes {
          author {
            firstName
            lastName
          }
          contentful_id
          createdAt
          updatedAt
          title
          slug
          excerpt {
            excerpt
          }
          privatePost
          featuredImage {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  `);

  const postNodes = data.posts.nodes || [];

  return (
    <Box textAlign="left" pt={4} mb={8} mt={6}>
      <Heading as="h1">Her kommer privat informasjon fra styret.</Heading>
      <Text as="p" mb={30}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
        massa hendrerit, ultrices justo quis, vestibulum erat.
      </Text>
      <Box>
        {postNodes.map((post) => (
          <Box key={post.contentful_id}>
            <Image
              as={GatsbyImage}
              fluid={post.featuredImage.fluid}
              shadow="lg"
              mb={5}
              alt={post.featuredImage.description}
            />

            <Heading
              as="h1"
              size="xl"
              mb={4}
              fontWeight="bold"
              color="gray.700"
              textAlign="left"
            >
              {post.title}
            </Heading>
            <Text fontSize="md" textAlign="left" color="gray.700">
              {post.excerpt.excerpt}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PrivateInfoList;
