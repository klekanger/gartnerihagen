import { useAuth0 } from '@auth0/auth0-react';
import { Box, Heading } from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';

export default function DocumentEditor() {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      menuItems: contentfulServiceMenu(serviceMenuTitle: { eq: "infomeny" }) {
        menu1
        menu2
        menu3
        menu4
        menu5
        menu6
      }
    }
  `);

  const { menuItems } = data || [];
  console.log('menuItems', menuItems);

  const { user, isAuthenticated, error } = useAuth0();
  const userRoles = user['https:/gartnerihagen-askim.no/roles'];
  const isAdmin = userRoles.includes('admin');
  const isEditor = userRoles.includes('editor');

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return <h1>Ikke autentisert</h1>;
  }

  if (!(isEditor || isAdmin)) {
    return <h1>Ikke redaktør- eller admin-tilgang</h1>;
  }

  return (
    <Box
      maxWidth={['97%', '95%', '95%', '70%']}
      my={8}
      pt={[8, 16, 8, 16]}
      pb={[8, 8, 8, 16]}
      textAlign='center'
    >
      <Heading
        as='h1'
        size='2xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        Rediger dokumenter
      </Heading>
      <Heading
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menuItems.menu1}
      </Heading>
      <Heading
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menuItems.menu2}
      </Heading>
      <Heading
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menuItems.menu3}
      </Heading>
      <Heading
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menuItems.menu4}
      </Heading>
      <Heading
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menuItems.menu5}
      </Heading>
      <Heading
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menuItems.menu6}
      </Heading>
    </Box>
  );
}
