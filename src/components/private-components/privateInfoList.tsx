import * as React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Flex, Box, Image, Link, Heading, Text } from '@chakra-ui/react';

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
            gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.6)
            description
            title
          }
        }
      }
    }
  `);

  const postNodes = data.posts.nodes || [];

  return (
    <Box textAlign='left'>
      <Box pt={['8', '8', '16', '16']}>
        {postNodes.map((post) => (
          <Flex
            key={post.contentful_id}
            pb={8}
            direction={['column-reverse', 'column-reverse', 'row', 'row']}
          >
            <Box
              mb={[4, 4, 0, 0]}
              pr={[0, 0, 8, 8]}
              w={['100%', '100%', '50%', '50%']}
            >
              <Link
                as={GatsbyLink}
                to={`/informasjon/post/${post.slug}`}
                color='black'
                _hover={{ textDecor: 'none' }}
              >
                <Heading
                  as='h1'
                  size='xl'
                  mb={4}
                  textAlign='left'
                  _hover={{ color: 'blue.700' }}
                >
                  {post.title}
                </Heading>
              </Link>
              <Text
                fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                textAlign='left'
                noOfLines={6}
              >
                {post.excerpt.excerpt}
              </Text>
              <Text
                textAlign='left'
                pt={3}
                pb={[6, 6, 3, 3]}
                fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                _hover={{ color: 'primary' }}
              >
                <Link
                  as={GatsbyLink}
                  to={`/informasjon/post/${post.slug}`}
                  color='black'
                  _hover={{ textDecor: 'none', color: 'blue.700' }}
                >
                  Les mer <ChevronRightIcon />
                </Link>
              </Text>
            </Box>

            <Link
              as={GatsbyLink}
              to={`/informasjon/post/${post.slug}`}
              w={['100%', '100%', '60%', '60%']}
            >
              <Image
                as={GatsbyImage}
                image={post.featuredImage.gatsbyImageData}
                w='auto'
                alt={post.featuredImage.description}
                rounded='md'
                shadow='lg'
              />
            </Link>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default PrivateInfoList;

// TODO
//
// Make pagination
