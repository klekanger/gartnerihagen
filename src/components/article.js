import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import GatsbyImage from 'gatsby-image';
import renderRichTextOptions from '../theme/renderRichTextOptions';

const Article = ({ mainImage, title, bodyText, createdAt, updatedAt }) => {
  const publishDate =
    createdAt !== updatedAt
      ? `Publisert: ${createdAt} (oppdatert: ${updatedAt})`
      : `Publisert: ${createdAt}`;

  return (
    <Box maxWidth={['97%', '95%', '95%', '70%']} pt={[8, 12, 16, 24]}>
      <Heading
        as='h1'
        fontSize={['4xl', '6xl', '6xl', '7xl']}
        textAlign={['center', 'left', 'left', 'left']}
        pb={2}
      >
        {title}
      </Heading>
      {mainImage && (
        <Image
          as={GatsbyImage}
          fluid={{ ...mainImage.fluid, aspectRatio: 16 / 10 }}
          rounded='md'
          shadow='lg'
          alt={mainImage.description}
        />
      )}
      <Text as='div' my={[5, 10, 10, 10]} textAlign='left'>
        {renderRichText(bodyText, renderRichTextOptions)}
      </Text>

      <Text
        fontSize={['sm', 'sm', 'sm', 'sm']}
        fontStyle='italic'
        pb={[4, 16]}
        textAlign='left'
      >
        {publishDate}
      </Text>
      <Box align='left'>
        <Button
          as={GatsbyLink}
          to={`/blog/`}
          variant='standard'
          mb={16}
          _hover={{ textDecor: 'none' }}
        >
          Gå tilbake
        </Button>
      </Box>
    </Box>
  );
};

export default Article;