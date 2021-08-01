import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

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
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const CreateUserPage = () => {
  const rolesToNorwegian = {
    user: 'Bruker',
    editor: 'Redaktør',
    admin: 'Administrator',
  };

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
    app_metadata: { Role: 'user' },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [response, setResponse] = useState(null);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const opts = {
    audience: 'https://useradmin.gartnerihagen-askim.no',
    scope: 'create:users',
  };

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

  // Open modal when new user has been created
  useEffect(() => {
    if (response?.email) {
      onOpen();
    }
  }, [response]);

  // Handle creating a new user
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoadingButton(true);
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
    try {
      const accessToken = await getAccessTokenSilently(opts);
      const api = await fetch(`/api/admin-users/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify(formData),
      });

      if (api?.status !== 200) {
        throw new Error(`${api.statusText} (${api.status})`);
      }

      const isJson = api.headers
        .get('content-type')
        ?.includes('application/json');

      const data = isJson && (await api.json());

      if (!data) {
        throw new Error('no_data');
      }

      // Store the API response (e.g. the user data for the newly created user)
      setResponse(data?.body?.user);
      setShowLoadingButton(false);
    } catch (error) {
      if (error.message === 'consent_required') {
        getToken();
        return;
      }

      if (error.message === 'Conflict (409)') {
        toast({
          title: 'Brukeren eksistererer allerede',
          description:
            'Hver bruker må ha en unik epost-adresse og et unikt navn.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Noe gikk galt',
          description: `${error.message}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      setResponse(null);
      setShowLoadingButton(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size='2xl'
        colorScheme='cyan'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ny bruker er opprettet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <strong>Epost: </strong>
              {response?.email}
            </Text>
            <Text>
              <strong>Navn: </strong>
              {response?.name}
            </Text>
            <Text>
              <strong>Rolle: </strong>
              {rolesToNorwegian[response?.app_metadata?.Role]}
            </Text>
            <br />
            <Text>
              Gi brukeren beskjed om å logge seg på med passordet du valgte.
              Passordet bør byttes ved at brukeren går inn på "Min Side" og
              trykker "Bytt passord". Du kan også gjøre dette for brukeren ved å
              søke opp brukeren på siden for brukeradministrasjon og trykke
              "Bytt passord"-knappen. Brukeren vil da få en epost.
            </Text>
            <br />
          </ModalBody>

          <ModalFooter
            flexDirection={['column', 'row', 'row', 'row']}
            alignContent='flex-start'
          >
            <Button variant='menu-button' onClick={onClose} my={2} mx={2}>
              Legg til flere brukere
            </Button>
            <Button
              variant='standard'
              my={2}
              role='link'
              onClick={() => navigate('/user-admin')}
            >
              Tilbake til bruker&shy;administrasjon
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                    app_metadata: {
                      Role: role,
                    },
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
            <Button
              minW='50%'
              minH='3rem'
              variant='menu-button'
              type='submit'
              isLoading={showLoadingButton}
              loadingText='Oppretter bruker'
              _loading={{
                color: 'black',
              }}
            >
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
