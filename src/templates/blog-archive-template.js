import React from 'react';

import { graphql, Link as GatsbyLink } from 'gatsby';
import { ChevronRightIcon } from '@chakra-ui/icons';
import GatsbyImage from 'gatsby-image';
import SEO from '../components/seo';
import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    posts: allContentfulBlogPost(
      filter: { privatePost: { eq: false } }
      limit: $limit
      skip: $skip
      sort: { fields: [updatedAt], order: DESC }
    ) {
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
          fluid(maxWidth: 2000) {
            ...GatsbyContentfulFluid_withWebp
          }
          description
          title
        }
      }
    }
  }
`;

const BlogArchive = ({ data, errors }) => {
  const { nodes } = data.posts;

  return (
    <>
      <SEO />
      <Box w='95vw' ml='0' pr={['0', '0', '5vw', '30vw']} pt={8} pb={16}>
        <Box pt={['8', '8', '16', '16']} textAlign='left'>
          <Heading as='h1' size='3xl' textColor='black' pb={16}>
            Blogg
          </Heading>
          {nodes.map((post) => (
            <Flex
              key={post.contentful_id}
              direction={['column-reverse', 'column-reverse', 'row', 'row']}
            >
              <Box ml={0} mb={[4, 4, 0, 0]} w={['100%', '100%', '50%', '50%']}>
                <Link
                  as={GatsbyLink}
                  to={`/blog/${post.slug}`}
                  color='black'
                  _hover={{ textDecor: 'none' }}
                >
                  <Heading
                    as='h1'
                    size='xl'
                    mb={4}
                    my={[]}
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
              <Image
                as={GatsbyImage}
                fluid={{ ...post.featuredImage.fluid, aspectRatio: 16 / 10 }}
                mb={[2, 2, 8, 8]}
                ml={[0, 0, 39, 39]}
                w={['100%', '100%', '50%', '50%']}
                alt={post.featuredImage.description}
                rounded='md'
                shadow='lg'
              />
            </Flex>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default BlogArchive;

// TODO
// Add pagination at the bottom of each page
// (see https://nickymeuleman.netlify.app/blog/gatsby-pagination )
