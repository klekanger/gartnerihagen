import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Heading, Text } from '@chakra-ui/react';
import DocumentLibrary from '../documentLibrary';
import LoadingSpinner from '../loading-spinner';

interface IReferater {
  title: string;
  excerpt: string;
  props: {
    path: string;
    uri: string;
    children?: React.ReactNode;
    navigate?: any;
    location?: any;
  };
}

export default function Referater({ title, excerpt, ...props }) {
  const QUERY = gql`
    {
      menu: serviceMenu(id: "3ZMDi88bv5KLPFanE7JxPa") {
        menuItems: menu5FilesCollection {
          files: items {
            sys {
              id
              firstPublishedAt
              publishedAt
            }
            title
            url
            fileName
          }
        }
      }
    }
  `;

  const { data, error, loading } = useQuery(QUERY);

  if (error) {
    return (
      <Box maxWidth={['97%', '95%', '95%', '70%']} py={[8, 12, 16, 24]}>
        <Heading as='h1'>Noe gikk galt</Heading>
      </Box>
    );
  }

  if (loading) {
    return <LoadingSpinner spinnerMessage='Laster inn artikkel...' />;
  }

  const content = data?.menu?.menuItems?.files || [];

  return (
    <Box
      maxWidth={['97%', '95%', '95%', '60%']}
      pt={[8, 8, 8, 16]}
      textAlign={['center', 'center', 'left', 'left']}
    >
      <Heading
        as='h1'
        size='2xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {title}
      </Heading>
      <Text>{excerpt}</Text>
      <DocumentLibrary content={content} />
    </Box>
  );
}
