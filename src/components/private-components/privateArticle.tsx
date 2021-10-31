import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import ResponsiveImage from '../reponsiveImage';
import renderRichTextOptions from '../../theme/renderRichTextOptions';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { formatDate } from '../../utils/formatDate';

interface PrivateArticleProps {
  mainImage: {
    title: string;
    description: string;
    url: string;
  };
  title: string;
  author?: {
    firstName: string;
    lastName: string;
  }[];
  bodyText: any;
  createdAt: string;
  updatedAt: string;
  buttonLink: string;
}

function PrivateArticle({
  mainImage,
  title,
  author,
  bodyText,
  createdAt,
  updatedAt,
  buttonLink,
}: PrivateArticleProps) {
  // Format the dates shown at the bottom of every article page
  const formattedCreateDate = formatDate(createdAt);
  const formattedUpdatedDate = formatDate(updatedAt);

  const publishDate: string =
    createdAt !== updatedAt
      ? `Publisert: ${formattedCreateDate} (oppdatert: ${formattedUpdatedDate})`
      : `Publisert: ${formattedCreateDate}`;

  // Make string that will be used to show
  // a list of authors (with comma separators if there are more than one)
  let authorsToShow: string;
  author ? (authorsToShow = 'Av: ') : '';
  // Skip if author is not passed as props to this component
  if (author) {
    author.forEach((el, index) => {
      if (index < author.length - 1 && author.length !== 1) {
        authorsToShow = authorsToShow + el.firstName + ' ' + el.lastName + ', ';
      } else {
        authorsToShow = authorsToShow + el.firstName + ' ' + el.lastName;
      }
    });
  }

  // Put the rich text JSON and the linked entries into separate constants
  // that should be passed into documentToReactComponents
  const { json: richTextJson = {} } = bodyText;
  const { links = {} } = bodyText;

  return (
    <Box maxWidth={['97%', '95%', '95%', '60%']} pt={[12, 16, 16, 24]}>
      <Heading
        as='h1'
        fontSize={['4xl', '6xl', '6xl', '7xl']}
        textAlign={['center', 'left', 'left', 'left']}
        pb={4}
      >
        {title}
      </Heading>
      {mainImage && (
        <>
          <Image
            as={ResponsiveImage}
            url={mainImage.url}
            alt={mainImage.description}
            rounded='md'
            shadow='lg'
          />

          <Text
            as='p'
            textAlign='left'
            ml={2}
            px={4}
            py={2}
            bgColor='#efefef'
            fontSize={['sm', 'sm', 'sm', 'md']}
          >
            <em>{mainImage.description}</em>
          </Text>
        </>
      )}
      <Text as='div' my={[5, 10, 10, 10]} textAlign='left'>
        {documentToReactComponents(richTextJson, renderRichTextOptions(links))}
      </Text>

      <Text
        fontSize={['sm', 'sm', 'sm', 'sm']}
        fontStyle='italic'
        pb={[4, 16]}
        textAlign='left'
      >
        {publishDate}
        <br />
        {authorsToShow}
      </Text>
      <Box align='left'>
        <Button
          as={GatsbyLink}
          to={buttonLink}
          variant='standard'
          mb={16}
          _hover={{ textDecor: 'none' }}
        >
          Gå tilbake
        </Button>
      </Box>
    </Box>
  );
}

export default PrivateArticle;
