/**
 * 2 x 2 grid showing the last 4 blog articles
 *
 */

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Grid, Heading, Image, Link, Text } from '@chakra-ui/react';
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { IArticleGrid } from '../../types/interfaces';

export default function ArticleGrid() {
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
            gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.6)
            description
            title
          }
        }
      }
    }
  `);

  const postNodes: IArticleGrid[] = data.posts.nodes || [];

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
          <GatsbyLink to={`/blog/${post.slug}`}>
            <Image
              as={GatsbyImage}
              image={post.featuredImage.gatsbyImageData}
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
          </GatsbyLink>
          <Heading
            as='h1'
            size='xl'
            mb={4}
            mt={4}
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
      <Text textAlign='left' mt={-8} fontSize='lg'>
        <Link
          as={GatsbyLink}
          to='/blog'
          color='black'
          _hover={{ textDecor: 'none' }}
        >
          <em>Gå til bloggarkivet </em>
          <ChevronRightIcon />
        </Link>
      </Text>
    </Grid>
  );
}
