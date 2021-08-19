// Call Auth0s Change Password API endpoint
// The user will get a change password email
// API docs: https://auth0.com/docs/api/authentication#change-password

import { createStandaloneToast } from '@chakra-ui/react';

export async function requestChangePassword(userEmail: string) {
  const toast = createStandaloneToast();

  try {
    const opts = {
      client_id: `${process.env.GATSBY_AUTH0_CLIENT_ID}`,
      email: userEmail,
      connection: 'Username-Password-Authentication',
    };

    const response = await fetch(
      `https://${process.env.GATSBY_AUTH0_DOMAIN}/dbconnections/change_password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(opts),
      }
    );
    if (response?.status === 200) {
      toast({
        title: 'Be brukeren sjekke eposten sin',
        description: 'Brukeren vil få en epost for å endre passord.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Noe gikk muligens galt',
        description: 'Prøv igjen, eller ta kontakt med support.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  } catch (error) {
    toast({
      title: 'Noe gikk galt',
      description:
        'Det er antagelig vår feil, ikke din. Prøv igjen, eller ta kontakt med support.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }
}
