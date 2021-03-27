import * as React from 'react';
import { useState, useEffect } from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import {
  ChevronRightIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  Flex,
  Box,
  Button,
  Image,
  Link,
  Heading,
  Text,
} from '@chakra-ui/react';

// Get only posts marked as "private"
// Private posts are only visible for authenticated users
const PrivateInfoList = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allContentfulBlogPost(
        sort: { fields: createdAt, order: DESC }
        filter: { privatePost: { eq: true } }
      ) {
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

  // Calculate number of Pages and other things we need for pagination
  const postsPerPage = 6;
  const numPages = Math.ceil(postNodes.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Get the correct posts for the page we are on
  const currentPosts = postNodes.slice(indexOfFirstPost, indexOfLastPost);

  // Map over the posts for the page we are on, and store it in a constant
  // for rendering later
  const renderPostPreview = currentPosts.map((post) => {
    return (
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
    );
  });

  // Render everything, and show the correct pagination buttons
  // depending on which page we are on
  return (
    <Box textAlign='left'>
      <Box pt={['8', '8', '16', '16']}>{renderPostPreview}</Box>
      <Text
        fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
        align={['center', 'left']}
        pb={16}
      >
        {!isFirst && (
          <Button
            variant='standard'
            leftIcon={<ArrowBackIcon />}
            onClick={() => setCurrentPage(currentPage - 1)}
            mr={1}
          >
            Forrige side
          </Button>
        )}

        {!isLast && (
          <Button
            variant='standard'
            rightIcon={<ArrowForwardIcon />}
            onClick={() => setCurrentPage(currentPage + 1)}
            ml={1}
          >
            Neste side
          </Button>
        )}
      </Text>
    </Box>
  );
};

export default PrivateInfoList;
