import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Box, Heading, Text } from '@chakra-ui/react';
import DocumentLibrary from '../documentLibrary';

export default function Referater({ title, excerpt, ...props }) {
  const { menu } = useStaticQuery(graphql`
    {
      menu: contentfulServiceMenu {
        files: menu5Files {
          contentful_id
          file {
            url
            fileName
          }
          createdAt(formatString: "DD.MM.YYYY")
          updatedAt(formatString: "DD.MM.YYYY")
        }
      }
    }
  `);

  const content = menu?.files || [];

  return (
    <Box
      maxWidth={['97%', '95%', '95%', '70%']}
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
