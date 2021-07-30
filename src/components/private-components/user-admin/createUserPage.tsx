import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { navigate } from 'gatsby';
import NotLoggedIn from '../../notLoggedIn';
import ErrorPage from '../../errorPage';

import {
  Box,
  Heading,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { responsePathAsArray } from 'graphql-compose/lib/graphql';

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
    role: 'user',
  });
  const [callApiToCreateUser, setCallApiToCreateUser] = useState(false);

  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const opts = {
    audience: 'https://useradmin.gartnerihagen-askim.no',
    scope: 'create:users',
  };

  const toast = useToast();

  async function getToken() {
    try {
      await getAccessTokenWithPopup(opts);
    } catch (error) {
      console.error(
        'Noe gikk galt, eller brukeren lukket popupen:  ',
        `${error.error_description} - ${error.error}`
      );
    }
  }

  useEffect(() => {
    if (callApiToCreateUser) {
      setCallApiToCreateUser(false);

      (async function createUser() {
        try {
          const accessToken = await getAccessTokenSilently(opts);
          const response = await fetch(`/api/admin-users/create-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },

            body: JSON.stringify(formData),
          });

          if (response?.status !== 200) {
            console.error('Noe gikk galt:  ', response.status);
          }

          toast({
            title: 'Bruker er opprettet',
            description: ' .',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          if (error?.error === 'login_required') {
            return (
              <NotLoggedIn
                title='Logg inn for brukeradministrasjon'
                description='Du må logge inn for å administrere brukerkontoer for Boligsameiet Gartnerihagen. 
                  Du vil da kunne legge til, slette eller endre brukere, samt gi brukere admin-tilgang.
                  Ta kontakt med styret.'
              />
            );
          }
          if (error?.error === 'consent_required') {
            getToken();
            return;
          }

          return <ErrorPage errorMsg={error?.message} />;
        }
      })();
    }
  }, [callApiToCreateUser]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if both passwords are identical
    if (formData.password !== formData.repeatPassword) {
      toast({
        title: 'Passordene er ikke like',
        description:
          'Pass på at du har skrevet passordet helt likt i de to feltene.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if password matches pattern

    if (!formData.password.match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})/)) {
      toast({
        title: 'Ikke sterkt nok passord',
        description:
          'Passordet må inneholde både tall og store og små bokstaver, og være minst 8 tegn langt.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Call create-user API with the formdata
    setCallApiToCreateUser(true);
  };

  return (
    <>
      <Box
        maxWidth={['97%', '90%', '70%', '32rem']}
        px={[2, 4, 8, 8]}
        my={16}
        textAlign='center'
        borderWidth='md'
        border='1px'
        borderRadius='md'
        shadow='md'
      >
        <Heading as='h1' size='2xl' py={8} maxWidth='95vw'>
          Opprett ny bruker
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl id='email' isRequired>
            <FormLabel>Epost-adresse</FormLabel>
            <Input
              type='email'
              placeholder='navn@domene.no'
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl id='name' isRequired>
            <FormLabel>Fornavn og etternavn</FormLabel>
            <Input
              value={formData.name}
              placeholder='Fornavn Etternavn'
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
            />
          </FormControl>

          <FormControl id='password' isRequired>
            <FormLabel>Passord</FormLabel>
            <Input
              type='password'
              placeholder='*****'
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
          </FormControl>

          <FormControl id='repeat-password' isRequired>
            <FormLabel>Gjenta passord</FormLabel>
            <Input
              type='password'
              placeholder='*****'
              value={formData.repeatPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  repeatPassword: e.target.value,
                });
              }}
            />
          </FormControl>

          <Tooltip
            label='Bruker: Vanlig bruker || Redaktør: Kan publisere innhold || Administrator: Alle rettigheter'
            bgColor='primaryButton'
          >
            <FormControl as='fieldset'>
              <RadioGroup
                defaultValue='user'
                mt={8}
                onChange={(role) => {
                  setFormData({
                    ...formData,
                    role,
                  });
                }}
              >
                <Stack direction='row'>
                  <Radio value='user'>Bruker</Radio>
                  <Radio value='editor'>Redaktør</Radio>
                  <Radio value='admin'>Administrator</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Tooltip>
          <Stack direction={['column', 'column', 'row', 'row']} py={8}>
            <Button minW='50%' minH='3rem' variant='standard' type='submit'>
              Opprett
            </Button>
            <Button
              minW='50%'
              minH='3rem'
              variant='danger'
              _hover={{ bg: '#555' }}
              onClick={() => navigate('/user-admin')}
            >
              Avbryt
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default CreateUserPage;

// TODO
// Email and password should work with ÆØÅ
