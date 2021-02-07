import React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import { ChevronRightIcon } from '@chakra-ui/icons';
import GatsbyImage from 'gatsby-image';

import { Flex, Box, Image, Link, Heading, Text } from '@chakra-ui/react';

const InfoList = () => {
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
    <Box textAlign='left' mb={8}>
      <Box bg='light2' px={4} pt={4} pb={8} mb={[8, 8, 16, 16]}>
        <Heading as='h1' size='2xl'>
          Informasjon fra styret
        </Heading>
        <Text as='p'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          at massa hendrerit, ultrices justo quis, vestibulum erat.
        </Text>
      </Box>

      <Box>
        {postNodes.map((post) => (
          <Flex
            key={post.contentful_id}
            direction={['column-reverse', 'column-reverse', 'row', 'row']}
          >
            <Box ml={0} mb={[4, 4, 0, 0]} w={['100%', '100%', '50%', '50%']}>
              <Heading as='h1' size='xl' mb={4} my={[]} textAlign='left'>
                {post.title}
              </Heading>
              <Text fontSize='md' textAlign='left' noOfLines={6}>
                {post.excerpt.excerpt}
              </Text>
              <Text
                textAlign='left'
                pt={3}
                pb={[6, 6, 3, 3]}
                fontSize={{ base: 'xs', sm: 'sm', md: 'lg' }}
                _hover={{ color: 'primary' }}
              >
                <Link
                  as={GatsbyLink}
                  to='#'
                  color='black'
                  _hover={{ textDecor: 'none' }}
                >
                  Les mer <ChevronRightIcon />
                </Link>
              </Text>
            </Box>
            <Image
              as={GatsbyImage}
              fluid={post.featuredImage.fluid}
              shadow='lg'
              mb={[2, 2, 8, 8]}
              ml={[0, 0, 39, 39]}
              w={['100%', '100%', '50%', '50%']}
              alt={post.featuredImage.description}
            />
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default InfoList;
