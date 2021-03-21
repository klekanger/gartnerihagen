import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Box, Image, Heading, Text, Button } from '@chakra-ui/react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import renderRichTextOptions from '../../theme/renderRichTextOptions';
import { format, parseISO } from 'date-fns';
import norwegian from 'date-fns/locale/nb';

interface IPrivateInfoProps {
  slug: string;
  postData: {
    privatePosts: {
      nodes: {
        author?: {
          firstName: string;
          lastName: string;
        };
        contentful_id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        slug: string;
        excerpt?: {
          excerpt: string;
        };
        bodyText: {
          raw: string;
          references: any;
        };
        privatePost: boolean;
        featuredImage?: {
          description: string;
          title: string;
          gatsbyImageData: IGatsbyImageData;
        };
      }[];
    };
  };
}

export default function PrivateInfo({ slug, postData }: IPrivateInfoProps) {
  const postNodes = postData?.privatePosts.nodes ?? [];

  // Find the post with the same slug as the current page
  const postToShow = postNodes.find((post: any) => post.slug === slug);

  // Slug does not exist -- redirect to 404
  if (!postToShow) {
    return (
      <Box maxWidth={['97%', '95%', '95%', '70%']} py={[8, 12, 16, 24]}>
        <Heading as='h1'>Siden eksisterer ikke</Heading>
      </Box>
    );
  }

  const { title, bodyText, featuredImage, createdAt, updatedAt } = postToShow;

  // Format article dates
  const createdAtFormated = format(parseISO(createdAt), 'dd. LLLL yyyy', {
    locale: norwegian,
  });
  const updatedAtFormated = format(parseISO(updatedAt), 'dd. LLLL yyyy', {
    locale: norwegian,
  });

  // Show publish date on article. Update date only if updated.
  const publishDate =
    createdAt !== updatedAt
      ? `Publisert: ${createdAtFormated} (oppdatert: ${updatedAtFormated})`
      : `Publisert: ${createdAtFormated}`;

  const topImage = featuredImage?.gatsbyImageData ? (
    <Image
      as={GatsbyImage}
      image={featuredImage.gatsbyImageData}
      shadow='lg'
      rounded='md'
      alt={featuredImage.description}
    />
  ) : null;

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
      {topImage}
      <Text
        as='p'
        textAlign='left'
        ml={2}
        p={2}
        fontSize={['sm', 'sm', 'sm', 'md']}
      >
        <em>{featuredImage.description}</em>
      </Text>
      <Text as='div' my={[5, 10, 10, 10]}>
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
          to={`/informasjon/`}
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
