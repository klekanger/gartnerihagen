import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { MotionBox } from '../../utils/MotionBox';

import { Box, Button, Image, Heading, Text } from '@chakra-ui/react';

const HeroWide = () => {
  const data = useStaticQuery(
    graphql`
      query {
        contentfulForsidetekst {
          contentful_id
          pageTitle
          excerpt {
            excerpt
          }
          contentful_id
          pageImage {
            fluid(maxWidth: 3000) {
              ...GatsbyContentfulFluid_withWebp
            }
            title
            imageDesc: description
          }
          buttonLink {
            contentful_id
            pageTitle
          }
        }
      }
    `
  );

  const {
    pageTitle,
    excerpt: { excerpt },
    pageImage,
    pageImage: { imageDesc },
  } = data.contentfulForsidetekst;

  return (
    <Box className='test' w='100vw' maxW='100%' mt='-80px'>
      <Box as='div' overflow='hidden'>
        <MotionBox
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.5 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Image
            as={GatsbyImage}
            fluid={pageImage.fluid}
            alt={imageDesc}
            h={['70vh', '100vh']}
          />
        </MotionBox>
      </Box>

      <Box
        bgColor='darkTransparent'
        position='absolute'
        w={['90vw', '90vw', '60vw', '60vw']}
        maxW='90%'
        px={[0, 5]}
        mx={['5vw', '5vw', '20vw', '20vw']}
        top={['20vh', '45vh', '30vh', '30vh']}
        rounded='md'
      >
        <Heading
          as='h1'
          fontWeight='semibold'
          fontSize={['3xl', '5xl', '6xl', '6xl']}
          color='white'
          m={0}
          textAlign={['center', 'left', 'left', 'left']}
          padding={[2, 4, 8, 8]}
        >
          {pageTitle}
          <Text
            variant='light'
            fontSize={{ base: 'md', sm: 'md', md: 'lg' }}
            fontWeight='normal'
            lineHeight='normal'
            mt={3}
            mb={5}
          >
            {excerpt}
          </Text>
          <Link to='/om-boligsameiet-gartnerihagen'>
            <Button
              variant='standard'
              borderRadius='8px'
              mb={4}
              px={[2, 5, 5, 5]}
              py={[2, 7, 7, 7]}
              fontSize={[12, 20, 20, 20]}
              lineHeight='1'
              shadow='lg'
              bgColor='primaryButton'
              color='black'
              _hover={{ bgColor: 'secondaryButton' }}
            >
              Les mer
            </Button>
          </Link>
        </Heading>
      </Box>
    </Box>
  );
};

export default HeroWide;
