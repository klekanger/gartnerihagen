import React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import { ChevronRightIcon } from '@chakra-ui/icons';
import GatsbyImage from 'gatsby-image';
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
    <Box textAlign='left'>
      <Box bg='#78ad96' px={4} pt={4} pb={8} rounded='md' shadow='lg'>
        <Heading as='h1' size='2xl' textColor='black'>
          Informasjon fra styret
        </Heading>
        <Text as='p' fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
          På denne siden finner du nyttig informasjon fra styret. Ta kontakt
          hvis det er noe du savner, eller har tilbakemeldinger.
        </Text>
      </Box>

      <Box pt={['8', '8', '16', '16']}>
        {postNodes.map((post) => (
          <Flex
            key={post.contentful_id}
            pb={8}
            direction={['column-reverse', 'column-reverse', 'row', 'row']}
          >
            <Box ml={0} mb={[4, 4, 0, 0]} w={['100%', '100%', '50%', '50%']}>
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
  );
};

export default PrivateInfoList;

// TODO
// Make links to articles (logged in only) clickable
