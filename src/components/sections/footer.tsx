/**
 * Footer component
 */

import * as React from 'react';
import { Flex, Text, Link, Box } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import { SiGatsby } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Flex
        as='nav'
        align={['center', 'center', 'flex-start', 'flex-start']}
        justify='space-between'
        wrap='wrap'
        w='100%'
        mb={0}
        pt={16}
        pb={16}
        px={10}
        bgColor='dark'
        color='gray.300'
        opacity='90%'
        fontSize='sm'
        direction={['column', 'column', 'row', 'row']}
      >
        <Box>
          <Text variant='light' mb={[4, 4, 0, 0]}>
            &copy; {currentYear} Boligsameiet Gartnerihagen <br />
            <Link
              as={GatsbyLink}
              to='/cookies-og-personvern-gdpr'
              _hover={{ textDecor: 'none', color: 'light' }}
            >
              Personvernerklæring
            </Link>
          </Text>
        </Box>
        <Box>
          {' '}
          <Text variant='light' mb={[4, 4, 0, 0]}>
            Epost:{' '}
            <Link
              href='mailto:post@gartnerihagen-askim.no'
              _hover={{ textDecor: 'none', color: 'light' }}
            >
              gartnerihagen@gmail.com
            </Link>{' '}
            <br />
            Telefon: +47 - 4021 0140 <br />
          </Text>
          <br />
          <Text color='secondaryButton' pb={[8, 8, 0, 0]}>
            Vil du ha en nettside som dette? <br />
            Ta kontakt med{' '}
            <a href='mailto:kurt@lekanger.no'>kurt@lekanger.no</a>
          </Text>
        </Box>

        <Box>
          <Text variant='light' mb={[4, 4, 0, 0]}>
            Webdesign:{' '}
            <Link
              href='https://www.lekanger.no'
              _hover={{ textDecor: 'none', color: 'light' }}
            >
              Kurt Lekanger
            </Link>
            <br />
            Bygget med{' '}
            <Link
              href='https://www.gatsbyjs.com/'
              _hover={{ textDecor: 'none', color: 'light' }}
            >
              Gatsby{' '}
              <SiGatsby aria-hidden='true' style={{ display: 'inline' }} />
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
}
