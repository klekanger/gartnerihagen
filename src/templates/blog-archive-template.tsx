// Blog archive page
// Number of blog posts per page are set in gatsby-node.js (postsPerPage)

import * as React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import {
  ChevronRightIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import SEO from '../components/seo';
import ErrorPage from '../components/errorPage';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';

interface IBlogArchive {
  pageContext: {
    currentPage: number;
    limit: number;
    numPages: number;
    skip: number;
  };
  data: {
    posts: {
      nodes: {
        contentful_id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        slug: string;
        excerpt?: {
          excerpt: string;
        };
        featuredImage: {
          description: string;
          title: string;
          gatsbyImageData: IGatsbyImageData;
        };
      }[];
    };
  };
  errors: any;
}

export default function BlogArchive({
  pageContext,
  data,
  errors,
}: IBlogArchive) {
  if (errors) {
    return <ErrorPage />;
  }

  const { nodes } = data.posts;
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;

  return (
    <>
      <SEO />
      <Box maxWidth={['97%', '95%', '95%', '60%']} pt={[12, 16, 16, 24]}>
        <Box textAlign='left'>
          <Heading as='h1' size='3xl' textColor='black' pb={[8, 8, 16, 16]}>
            Siste blogg&shy;innlegg
          </Heading>
          {nodes.map((post) => (
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
                  {post.excerpt?.excerpt}
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
                    to={`/blog/${post.slug}`}
                    color='black'
                    _hover={{ textDecor: 'none', color: 'blue.700' }}
                  >
                    Les mer <ChevronRightIcon />
                  </Link>
                </Text>
              </Box>
              <Link
                as={GatsbyLink}
                to={`/blog/${post.slug}`}
                w={['100%', '100%', '60%', '60%']}
              >
                <Image
                  as={GatsbyImage}
                  image={post.featuredImage.gatsbyImageData}
                  w='auto'
                  alt={post.featuredImage?.description}
                  rounded='md'
                  shadow='lg'
                />
              </Link>
            </Flex>
          ))}
        </Box>
        <Text
          fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
          align={['center', 'left']}
        >
          {!isFirst && (
            <Button
              as={GatsbyLink}
              to={prevPage}
              rel='prev'
              variant='standard'
              leftIcon={<ArrowBackIcon />}
              mr={1}
            >
              Forrige side
            </Button>
          )}

          {!isLast && (
            <Button
              as={GatsbyLink}
              to={nextPage}
              rel='next'
              variant='standard'
              rightIcon={<ArrowForwardIcon />}
              ml={1}
            >
              Neste side
            </Button>
          )}
        </Text>
      </Box>
    </>
  );
}

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    posts: allContentfulBlogPost(
      filter: { privatePost: { eq: false } }
      limit: $limit
      skip: $skip
      sort: { fields: [createdAt], order: DESC }
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
`;
