import React from "react";
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby";
import { ChevronRightIcon } from "@chakra-ui/icons";
import GatsbyImage from "gatsby-image";

import {
  Stack,
  Hstack,
  Flex,
  Container,
  Box,
  Image,
  Link,
  Heading,
  Text,
} from "@chakra-ui/react";

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
      <Heading as="h1" size="2xl">
        Informasjon fra styret
      </Heading>
      <Text as="p" mb={["3rem", "3rem", "6rem", "6rem"]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
        massa hendrerit, ultrices justo quis, vestibulum erat.
      </Text>

      <Box>
        {postNodes.map((post) => (
          <Flex
            key={post.contentful_id}
            direction={["column-reverse", "column-reverse", "row", "row"]}
          >
            <Box ml={0} mb={[4, 4, 0, 0]} pr={8} w="90%">
              <Heading as="h1" size="xl" mb={4} my={[]} textAlign="left">
                {post.title}
              </Heading>
              <Text fontSize="md" textAlign="left">
                {post.excerpt.excerpt}
              </Text>
              <Text
                textAlign="left"
                pt={3}
                pb={[6, 6, 3, 3]}
                fontSize={{ base: "xs", sm: "sm", md: "lg" }}
                _hover={{ color: "primary" }}
              >
                <Link
                  as={GatsbyLink}
                  to="#"
                  color="black"
                  _hover={{ textDecor: "none" }}
                >
                  Les mer <ChevronRightIcon />
                </Link>
              </Text>
            </Box>
            <Image
              as={GatsbyImage}
              fluid={post.featuredImage.fluid}
              shadow="lg"
              mb={[2, 2, 8, 8]}
              w="100%"
              maxH={["50vh", "50vh", "40vh", "40vh"]}
              alt={post.featuredImage.description}
            />
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default PrivateInfoList;

/*
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";

import { Box, Image, Heading, Text } from "@chakra-ui/react";



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
*/
