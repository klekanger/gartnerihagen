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
          gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.6)
          description
          title
        }
      }
    }
  }
`;

interface IBlogArchive {
  pageContext: {
    currentPage: number,
    limit: number,
    numPages: number,
    skip: number
  },
  data: {
    posts: {
      nodes: {
        contentful_id: string,
        createdAt: string ,
        updatedAt: string,
        title: string,
        slug: string,
        excerpt?: {
          excerpt: string,
        },
        featuredImage: {
          description: string,
          title: string,
          gatsbyImageData: IGatsbyImageData
        }
      }[]
    }
  },
  errors: any
}

const BlogArchive = ({ pageContext, data, errors }: IBlogArchive) => {
  const { nodes }  = data.posts;
  
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;

  if (errors) {
    return <ErrorPage />;
  }

  return (
    <>
      <SEO />
      <Box maxWidth={['97%', '95%', '95%', '70%']} pt={8} pb={16}>
        <Box pt={['8', '8', '16', '16']} textAlign='left'>
          <Heading as='h1' size='3xl' textColor='black' pb={16}>
            Blogg
          </Heading>
          {nodes.map((post) => (
            <Flex
              key={post.contentful_id}
              pb={8}
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
                image={post.featuredImage.gatsbyImageData}
                mb={[2, 2, 8, 8]}
                ml={[0, 0, 39, 39]}
                w={['100%', '100%', '50%', '50%']}
                alt={post.featuredImage?.description}
                rounded='md'
                shadow='lg'
              />
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
};

export default BlogArchive;

// TODO
// Add pagination at the bottom of each page
// (see https://nickymeuleman.netlify.app/blog/gatsby-pagination )
