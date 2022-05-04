// ServiceBox
// Providing the user with useful links to documents etc.

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Stack, Text, Tooltip } from '@chakra-ui/react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import MenuButton from '../menubutton'; // Custom button component

// Define custom servicebox buttons as clickable links
// Button title and link URL are fetched from Contentful
// The first four buttons link to one document per button
// The two last buttons (5 and 6) are multi document buttons and should go to a component
// fetching all documents for menu5files and menu6files

interface IServiceBoxQuery {
  menuItems: {
    id: string;
    menu1: string;
    menu1File: {
      file: {
        url: string;
      };
    };
    menu2: string;
    menu2File: {
      file: {
        url: string;
      };
    };
    menu3: string;
    menu3File: {
      file: {
        url: string;
      };
    };
    menu4: string;
    menu4File: {
      file: {
        url: string;
      };
    };
    menu5: string;
    menu6: string;
  };
}

export default function ServiceBox() {
  // Get text and links for menu items from Contentful
  // In Contentful, the field serviceMenuTitle should equal "infomeny"
  const data = useStaticQuery(graphql`
    query MyQuery {
      menuItems: contentfulServiceMenu(serviceMenuTitle: { eq: "infomeny" }) {
        id
        menu1
        menu1File {
          file {
            url
          }
        }
        menu2
        menu2File {
          file {
            url
          }
        }
        menu3
        menu3File {
          file {
            url
          }
        }
        menu4
        menu4File {
          file {
            url
          }
        }
        menu5
        menu6
      }
    }
  `);

  const { menuItems }: IServiceBoxQuery = data || [];

  const { user } = useAuth0();
  const userRoles: string[] = user['https:/gartnerihagen-askim.no/roles'];
  const isAdmin: boolean = userRoles.includes('admin');
  const isEditor: boolean = userRoles.includes('editor');

  return (
    <Box pt={[4, 8, 8, 16]} pb={[8, 8, 16, 16]} textAlign='left'>
      <Box
        borderColor='gray.400'
        borderStyle={'dashed'}
        rounded='md'
        borderWidth={isAdmin || isEditor ? '1px' : '0px'}
        p={2}
      >
        {isAdmin || isEditor ? (
          <Box ml={2}>
            <Link to='/edit-documents'>
              <Tooltip
                label='Rediger'
                placement='right'
                py={1}
                px={4}
                bg='primaryLight'
                textColor='black'
                rounded='md'
              >
                <Box
                  w='min-content'
                  my={2}
                  _hover={{
                    textColor: 'primaryLight',
                  }}
                >
                  <HiOutlinePencilAlt size={30} />
                </Box>
              </Tooltip>
            </Link>
            {`${
              isAdmin ? 'Du har admintilgang' : 'Du har redaktørtilgang'
            }. Klikk blyanten for å legge til eller fjerne dokumenter`}
          </Box>
        ) : null}

        <Stack
          direction={['column', 'column', 'row', 'row']}
          justify='space-between'
          py={['2', '2', '8', '8']}
        >
          <MenuButton linkTo={menuItems?.menu1File.file.url}>
            <Text variant='dark' textAlign='center'>
              {menuItems?.menu1}
            </Text>
          </MenuButton>

          <MenuButton linkTo={menuItems?.menu2File.file.url}>
            <Text variant='dark' textAlign='center'>
              {menuItems?.menu2}
            </Text>
          </MenuButton>
          <MenuButton linkTo={menuItems?.menu3File.file.url}>
            <Text variant='dark' textAlign='center'>
              {menuItems?.menu3}
            </Text>
          </MenuButton>
        </Stack>
        <Stack
          direction={['column', 'column', 'row', 'row']}
          justify='space-between'
          pt={0}
        >
          <MenuButton linkTo={menuItems?.menu4File.file.url}>
            <Text variant='dark' textAlign='center'>
              {menuItems?.menu4}
            </Text>
          </MenuButton>
          <MenuButton multiLink to='/informasjon/referater'>
            <Text variant='dark' textAlign='center'>
              {menuItems?.menu5}
            </Text>
          </MenuButton>
          <MenuButton multiLink to='/informasjon/dokumenter'>
            <Text variant='dark' textAlign='center'>
              {menuItems?.menu6}
            </Text>
          </MenuButton>
        </Stack>
      </Box>
    </Box>
  );
}
