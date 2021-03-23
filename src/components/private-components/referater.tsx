import * as React from 'react';
import { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Box, Heading, Text } from '@chakra-ui/react';
import DocumentLibrary from '../documentLibrary';
import { IdentityContext } from '../../context/identity-context';
import LoadingSpinner from '../loading-spinner';

interface IReferater {
  title: string;
  excerpt: string;
  props: {
    path: string;
    uri: string;
    children: React.ReactNode;
    navigate?: any;
  };
}

interface IMenu {
  menu: {
    files: {
      contentful_id: string;
      file: {
        url: string;
        fileName: string;
      };
      createdAt: string;
      updatedAt: string;
    }[];
  };
}

export default function Referater({ title, excerpt, ...props }: IReferater) {
  const { menu }: IMenu = useStaticQuery(graphql`
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

  const { isLoggingIn } = useContext(IdentityContext);

  if (isLoggingIn) {
    return (
      <Box>
        <LoadingSpinner spinnerMessage='Autentiserer bruker' />
      </Box>
    );
  }

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
