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
    <Box w='95vw' mx='0' mt={[0, 8, 8, 8]} mb={12} shadow='lg'>
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
            h={['50vh', '70vh', '80vh', '80vh']}
          />
        </MotionBox>
      </Box>

      <Box
        bgColor='darkTransparent'
        w={['90vw', '90vw', '80vw', '60vw']} // Set height of transparent background drop to height of text/heading container
        position='absolute'
        top={[180, 180, 200, 200]}
        left={[4, 4, 16, 16]}
        overflow='auto'
      >
        <Heading
          as='h1'
          fontWeight='semibold'
          fontSize={['4xl', '4xl', '6xl', '6xl']}
          color='white'
          m={0}
          textAlign={['center', 'left', 'left', 'left']}
          padding={[2, 4, 8, 8]}
        >
          {pageTitle}
          <Text
            variant='light'
            fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
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
              color='dark'
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
