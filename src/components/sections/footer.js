import React from 'react';
import { Flex, Text, Link, Box } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import { SiGatsby } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <hr />
      <Flex
        as='nav'
        align='center'
        justify='space-between'
        wrap='wrap'
        w='100%'
        mb={0}
        pt={10}
        pb={20}
        px={10}
        bgColor='dark'
        color='gray.300'
        opacity='90%'
        fontSize='sm'
        direction={['column', 'column', 'row', 'row']}
      >
        <Box>
          <Text variant='light' mb={[4, 4, 0, 0]}>
            &copy; {currentYear} Boligsameiet Gartnerihagen{' '}
          </Text>

          <Text
            variant='light'
            mb={[4, 4, 0, 0]}
            textAlign={['center', 'center', 'left', 'left']}
          >
            <Link
              as={GatsbyLink}
              to='/cookies-og-personvern-gdpr'
              _hover={{ textDecor: 'none', color: 'light' }}
            >
              Personvernerklæring
            </Link>
          </Text>
        </Box>
        <Text variant='light' mb={[4, 4, 0, 0]}>
          Epost:{' '}
          <Link
            href='mailto:gartnerihagen@gmail.com'
            _hover={{ textDecor: 'none', color: 'light' }}
          >
            gartnerihagen@gmail.com
          </Link>{' '}
          <br />
          Telefon: +47 - 4021 0140{' '}
        </Text>
        <Box>
          <Text variant='light' mb={[4, 4, 0, 0]}>
            Webdesign:{' '}
            <Link
              href='https://www.lekanger.no'
              _hover={{ textDecor: 'none', color: 'light' }}
            >
              Kurt Lekanger
            </Link>
          </Text>
          <Text variant='light'>
            Bygget med{' '}
            <Link
              href='https://www.gatsbyjs.com/'
              _hover={{ textDecor: 'none', color: 'light' }}
            >
              Gatsby <SiGatsby />
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
}
