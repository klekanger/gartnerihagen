import { gql, useQuery } from '@apollo/client';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import * as React from 'react';
import { useState } from 'react';
import LoadingSpinner from '../loading-spinner';
import ResponsiveImage from '../reponsiveImage';
import { IAllPrivatePosts } from '../../types/interfaces';

const QUERY = gql`
  query AllPrivatePosts {
    posts: blogPostCollection(where: { privatePost: true }) {
      items {
        sys {
          id
          createdAt: firstPublishedAt
          updatedAt: publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          url
          title
          description
        }
      }
    }
  }
`;

const PrivateInfoList = () => {
  const { data, error, loading } = useQuery<IAllPrivatePosts>(QUERY);
  let postNodes = data?.posts.items ?? [];
  let sortedPosts = [...postNodes];
  sortedPosts.sort((a: any, b: any) => a.sys.createdAt - b.sys.createdAt);

  // Calculate number of Pages and other things we need for pagination
  const postsPerPage = 6;
  const numPages = Math.ceil(sortedPosts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  if (error) {
    sortedPosts = [
      {
        title: 'Noe gikk galt...',
        excerpt: 'Ingen artikler å vise. Det er vår feil, ikke din.',
        featuredImage: {
          url: '',
        },
        slug: '#',
        sys: null,
      },
    ];
  }

  if (loading) {
    return <LoadingSpinner spinnerMessage='Laster artikler...' />;
  }

  // Get the correct posts for the page we are on
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Map over the posts for the page we are on, and store it in a constant
  // for rendering later
  const renderPostPreview = currentPosts.map((post) => {
    return (
      <Flex
        key={post?.sys?.id}
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
            to={`/informasjon/post/${post?.slug}/${post?.sys?.id}`}
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
                to={`/informasjon/post/${post?.slug}/${post?.sys?.id}`}
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
          to={`/informasjon/post/${post?.slug}/${post?.sys?.id}`}
          w={['100%', '100%', '60%', '60%']}
        >
          <Image
            as={ResponsiveImage}
            url={post.featuredImage.url}
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
