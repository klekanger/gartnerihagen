import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import ResponsiveImage from '../../utils/reponsiveImage';

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

const QUERY = gql`
  query AllPrivatePosts {
    posts: blogPostCollection {
      items {
        sys {
          id
          createdAt: firstPublishedAt
          updatedAt: publishedAt
        }
        privatePost
        title
        excerpt
        slug
        author: authorCollection {
          items {
            firstName
            lastName
          }
        }
        excerpt
        featuredImage {
          title
          description
          url
        }
      }
    }
  }
`;

const GetDocs = () => {
  const { data, errors, loading } = useQuery(QUERY);
  let postNodes = data?.posts.items ?? [];

  // Calculate number of Pages and other things we need for pagination
  const postsPerPage = 6;
  const numPages = Math.ceil(postNodes.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  if (errors) {
    postNodes = [
      {
        title: 'Noe gikk galt...',
        excerpt: 'Ingen artikler å vise. Det er vår feil, ikke din.',
        featuredImage: {
          url: '',
        },
      },
    ];
  }

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
            {post.excerpt}
          </Text>
          <Text
            textAlign='left'
            pt={3}
            pb={[6, 6, 3, 3]}
            fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
            _hover={{ color: 'primary' }}
          >
            {post.slug && (
              <Link
                as={GatsbyLink}
                to={`/informasjon/post/${post.slug}`}
                color='black'
                _hover={{ textDecor: 'none', color: 'blue.700' }}
              >
                Les mer <ChevronRightIcon />
              </Link>
            )}
          </Text>
        </Box>

        <Link
          as={GatsbyLink}
          to={`/informasjon/post/${post.slug}`}
          w={['100%', '100%', '60%', '60%']}
        >
          <Image
            as={ResponsiveImage}
            src={post.featuredImage.url}
            alt={post.featuredImage.description}
            w='auto'
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

export default GetDocs;
