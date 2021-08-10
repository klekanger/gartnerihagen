import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { navigate } from 'gatsby';
import { formatDate } from '../../../utils/formatDate';

import {
  Box,
  Heading,
  Badge,
  Flex,
  Button,
  Stack,
  Input,
  Image,
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

const UpdateUserPage = (props) => {
  const rolesToNorwegian = {
    user: 'Bruker',
    editor: 'Redaktør',
    admin: 'Administrator',
  };
  const [userDataForm, setUserDataForm] = useState(null);
  const userToModify = props.location.state;
  const toast = useToast();

  useEffect(() => {
    // defaults to "user" if role was not set when the user was created
    setUserDataForm({
      ...userToModify,
      app_metadata: {
        Role: userToModify?.app_metadata?.Role || 'user',
      },
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('[handleSubmit] userDataForm: ', userDataForm);
    console.log('[handleSubmit] event: ', event);

    // Ask if you are sure you want to update the user

    // Send userDataForm to Auth0 Management API to update user
  };

  // TODO ! DUPLICATED CODE - REFACTOR (also used in MinSide)
  const requestChangePassword = async () => {
    try {
      const opts = {
        client_id: `${process.env.GATSBY_AUTH0_CLIENT_ID}`,
        email: userToModify?.email,
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
        <Flex
          direction={['column', 'column', 'row', 'row']}
          align={['center', 'center', 'left', 'left']}
          pb={8}
        >
          <Image
            src={userToModify?.picture}
            alt={userToModify?.name}
            rounded='50%'
            width={16}
            my={4}
            mr={[0, 0, 8, 8]}
          />

          <Box flexDirection='column'>
            <Text as='div' fontSize='lg' fontWeight='semibold' align='left'>
              {userToModify?.name}{' '}
              {userToModify?.app_metadata?.Role ? (
                <Badge colorScheme='red'>
                  {rolesToNorwegian[userToModify?.app_metadata?.Role]}
                </Badge>
              ) : (
                <Badge colorScheme='green'>{rolesToNorwegian['user']}</Badge>
              )}
            </Text>

            <Text as='div' fontSize='sm' align='left'>
              <strong>Konto opprettet:</strong>{' '}
              {formatDate(userToModify?.created_at)}
            </Text>
            <Text as='div' fontSize='sm' align='left'>
              {userToModify?.last_login && (
                <>
                  <strong>Sist innlogget:</strong>{' '}
                  {formatDate(userToModify?.last_login)}
                </>
              )}
            </Text>
          </Box>
        </Flex>

        <form onSubmit={handleSubmit}>
          <FormControl id='email' isRequired>
            <FormLabel>Epost-adresse</FormLabel>
            <Input
              type='email'
              value={userDataForm?.email}
              onChange={(e) =>
                setUserDataForm({
                  ...userDataForm,
                  email: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl id='name' isRequired>
            <FormLabel>Fornavn og etternavn</FormLabel>
            <Input
              value={userDataForm?.name}
              placeholder='Fornavn Etternavn'
              onChange={(e) => {
                setUserDataForm({
                  ...userDataForm,
                  name: e.target.value,
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
                value={userDataForm?.app_metadata?.Role}
                mt={8}
                onChange={(role) => {
                  setUserDataForm({
                    ...userDataForm,
                    app_metadata: { Role: role },
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

          <br />
          <Text align='left' fontSize='x-small'>
            ( Auth0 user_id: {userToModify?.user_id} )
          </Text>

          <Stack direction={['column', 'column', 'row', 'row']} py={8}>
            <Button minW='33%' minH='3rem' variant='menu-button' type='submit'>
              Oppdater
            </Button>
            <Button
              minW='33%'
              minH='3rem'
              variant='standard'
              onClick={() => requestChangePassword()}
            >
              Bytt passord
            </Button>
            <Button
              minW='33%'
              minH='3rem'
              variant='danger'
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

export default UpdateUserPage;

// TODO
// Make it possible to change user Image
// https://auth0.com/docs/users/change-user-picture