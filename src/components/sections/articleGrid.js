import React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Image, Heading, Text, Grid, Link } from '@chakra-ui/react';

const ArticleGrid = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allContentfulBlogPost(
        filter: { privatePost: { eq: false } }
        limit: 4
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
  `);

  const postNodes = data.posts.nodes || [];

  return (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(1, 1fr)',
        lg: 'repeat(2, 1fr)',
        xl: 'repeat(2, 1fr)',
      }}
      pt={16}
      gap={16}
      mb={16}
      mt={0}
      maxWidth='95vw'
      minHeight='45vh'
    >
      {postNodes.map((post) => (
        <Box key={post.contentful_id}>
          <Link as={GatsbyLink} to={`/blog/${post.slug}`}>
            <Image
              as={GatsbyImage}
              fluid={{ ...post.featuredImage.fluid, aspectRatio: 16 / 10 }}
              mb={5}
              alt={post.featuredImage.description}
              _hover={{
                transform: 'scale(1.01)',
                transitionDuration: '0.1s',
              }}
              _active={{
                transform: 'scale(1.00)',
              }}
              rounded='md'
              shadow='lg'
            />
          </Link>
          <Heading
            as='h1'
            size='xl'
            mb={4}
            fontWeight='bold'
            color='gray.700'
            textAlign='left'
          >
            <Link
              as={GatsbyLink}
              to={`/blog/${post.slug}`}
              _hover={{ textDecor: 'none', color: 'blue.700' }}
            >
              {post.title}
            </Link>
          </Heading>
          <Text
            noOfLines={3}
            fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
            textAlign='left'
            color='gray.700'
          >
            {post.excerpt.excerpt}
          </Text>
          <Text
            textAlign='left'
            py={3}
            fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
            _hover={{ color: 'primary' }}
          >
            <Link
              as={GatsbyLink}
              to={`/blog/${post.slug}`}
              color='black'
              _hover={{ textDecor: 'none' }}
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
