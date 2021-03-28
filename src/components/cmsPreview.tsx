import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { Badge, Box, Heading } from '@chakra-ui/react';
import Article from '../components/article';

interface ICMSPreviewProps {
  slug: string;
  postData: {
    previewPosts: {
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

function CMSPreview({ slug, postData }: ICMSPreviewProps) {
  const postNodes = postData?.previewPosts.nodes ?? [];
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

  return (
    <>
      <Box maxWidth={['97%', '95%', '95%', '70%']} textAlign='left'>
        <Badge mt={16} mb={-16} colorScheme='red' fontSize='md'>
          Forhåndsvisning
        </Badge>
      </Box>
      <Article
        title={title}
        bodyText={bodyText}
        createdAt={createdAt}
        updatedAt={updatedAt}
        mainImage={featuredImage}
      />
    </>
  );
}

export default CMSPreview;
