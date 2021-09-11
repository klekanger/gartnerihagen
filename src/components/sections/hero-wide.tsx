import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Box, Button, Image, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface IHeroWide {
  contentful_id: string;
  pageTitle: string;
  excerpt: {
    excerpt: string;
  };
  pageImage: {
    gatsbyImageData: IGatsbyImageData;
    title: string;
    description: string;
  };
}

function HeroWide() {
  const data = useStaticQuery(
    graphql`
      query {
        contentfulForsidetekst {
          contentful_id
          pageTitle
          excerpt {
            excerpt
          }
          pageImage {
            gatsbyImageData(
              layout: FULL_WIDTH
              formats: WEBP
              aspectRatio: 1.6
              breakpoints: [750, 1080, 1366, 1920, 3840]
            )
            title
            description
          }
        }
      }
    `
  );

  const {
    pageTitle,
    excerpt: { excerpt },
    pageImage,
  }: IHeroWide = data.contentfulForsidetekst;

  const MotionBox = motion(Box);

  return (
    <Box w='100vw' maxW='100%' mt='-80px'>
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
            image={pageImage.gatsbyImageData}
            alt={pageImage.description}
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
            mt={3}
            lineHeight='base'
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
}

export default HeroWide;
