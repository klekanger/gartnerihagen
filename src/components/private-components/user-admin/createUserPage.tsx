import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
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
    roles: [],
    user_metadata: {},
  });

  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isEditorChecked, setIsEditorChecked] = useState(false);
  const [hasSubscribedToEmail, setHasSubscribedToEmail] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [response, setResponse] = useState(null);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const opts = {
    audience: 'https://useradmin.gartnerihagen-askim.no',
    scope: 'create:users read:roles create:role_members',
  };

  async function getToken() {
    try {
      await getAccessTokenWithPopup(opts);
    } catch (error) {
      toast({
        title: 'Noe gikk galt, eller du lukket popupen  ',
        description: `${error.error_description} - ${error.error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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

    setShowLoadingButton(true);

    // Add the checked roles to the formData
    formData.roles = ['user'];
    if (isAdminChecked) {
      formData.roles.push('admin');
    }
    if (isEditorChecked) {
      formData.roles.push('editor');
    }

    // Add user email alerts to the formData
    formData.user_metadata = {
      subscribeToEmails: hasSubscribedToEmail,
    };

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

      const isJson = api.headers
        .get('content-type')
        ?.includes('application/json');

      const data = isJson && (await api.json());

      if (!data) {
        throw new Error('no_data');
      }

      if (data.error) {
        throw new Error(
          `${data.error} : ${JSON.stringify(data?.error_description)}`
        );
      }

      // Store the API response (e.g. the user data for the newly created user)
      setResponse(data?.body?.user);

      setShowLoadingButton(false);
    } catch (error) {
      if (
        error.message.includes(
          'Consent required' || 'Forbidden (403)' || 'access_denied'
        )
      ) {
        getToken();
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
          description: `${error.name} - ${error.message}`,
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
              <strong>Roller: </strong>
              {response?.roles.map((role) => (
                <span key={`${role}-${response?.user_id}`}>
                  <Badge
                    colorScheme={role === 'admin' ? 'red' : 'green'}
                    mr={2}
                  >
                    {rolesToNorwegian[role]}
                  </Badge>
                </span>
              ))}
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
            <Button
              variant='standard-light'
              onClick={onClose}
              my={2}
              mx={2}
              _hover={{ bg: 'hoverButtonColor' }}
            >
              Legg til flere brukere
            </Button>
            <Button
              variant='standard-light'
              my={2}
              role='link'
              onClick={() => navigate('/user-admin')}
              _hover={{ bg: 'hoverButtonColor' }}
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
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    email: e.target.value,
                  };
                })
              }
            />
          </FormControl>

          <FormControl id='name' isRequired>
            <FormLabel>Fornavn og etternavn</FormLabel>
            <Input
              value={formData.name}
              placeholder='Fornavn Etternavn'
              onChange={(e) =>
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    name: e.target.value,
                  };
                })
              }
            />
          </FormControl>

          <FormControl id='password' isRequired>
            <FormLabel>Passord</FormLabel>
            <Input
              type='password'
              placeholder='*****'
              value={formData.password}
              onChange={(e) =>
                setFormData((prevState) => {
                  return { ...prevState, password: e.target.value };
                })
              }
            />
          </FormControl>

          <FormControl id='repeat-password' isRequired>
            <FormLabel>Gjenta passord</FormLabel>
            <Input
              type='password'
              placeholder='*****'
              value={formData.repeatPassword}
              onChange={(e) =>
                setFormData((prevState) => {
                  return { ...prevState, repeatPassword: e.target.value };
                })
              }
            />
          </FormControl>

          <CheckboxGroup>
            <Tooltip
              label='Bruker: Vanlig bruker || Redaktør: Kan publisere innhold || Administrator: Alle rettigheter'
              bgColor='primaryButton'
            >
              <Stack direction='row' mt={8}>
                <Checkbox isDisabled isChecked>
                  Bruker
                </Checkbox>
                <Checkbox
                  isChecked={isEditorChecked}
                  onChange={() => setIsEditorChecked(!isEditorChecked)}
                >
                  Redaktør
                </Checkbox>
                <Checkbox
                  isChecked={isAdminChecked}
                  onChange={() => setIsAdminChecked(!isAdminChecked)}
                >
                  Administrator
                </Checkbox>
              </Stack>
            </Tooltip>
            <Box align='left' mt={2}>
              <Checkbox
                isChecked={hasSubscribedToEmail}
                onChange={() => setHasSubscribedToEmail(!hasSubscribedToEmail)}
              >
                Abonnerer på epost-varslinger om nytt innhold
              </Checkbox>
            </Box>
          </CheckboxGroup>

          <Stack direction={['column', 'column', 'row', 'row']} py={8}>
            <Button
              minW='50%'
              minH='3rem'
              variant='standard-light'
              type='submit'
              isLoading={showLoadingButton}
              loadingText='Oppretter bruker'
              _loading={{
                color: 'black',
              }}
              _hover={{ bg: 'hoverButtonColor' }}
            >
              Opprett
            </Button>
            <Button
              minW='50%'
              minH='3rem'
              variant='danger'
              _hover={{ bg: 'hoverButtonDangerColor' }}
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

// TODO
// Assign roles to users using Auth0 RBAC. https://auth0.com/docs/api/management/v2?_gl=1*ofdxch*rollup_ga*OTI5MTM3MDkxLjE2MjIxMTUyNDY.*rollup_ga_F1G3E656YZ*MTYyNzgzMzAxMy4zOC4xLjE2Mjc4MzMxMzIuMQ..&_ga=2.17873081.1215343063.1627803041-2001283108.1620039566#!/Users/post_user_roles
