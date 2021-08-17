import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PageProps } from 'gatsby';
import { navigate } from 'gatsby';
import { formatDate } from '../../../utils/formatDate';
import ErrorPage from '../../errorPage';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';

interface UserData {
  created_at: string;
  last_login?: string;
  email: string;
  name: string;
  picture?: string;
  roles: string[];
  user_id: string;
}

const UpdateUserPage = (props: PageProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [isUpdateAlertOpen, setIsUpdateAlertOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const userToModify = props?.location?.state as UserData;
  if (!userToModify) {
    return (
      <ErrorPage
        errorTitle='Det har oppstått en feil'
        errorMsg='Brukerdata ble ikke funnet da brukeren skulle oppdateres.'
        backButton={true}
        backButtonLabel='Tilbake til bruker&shy;administrasjon'
        backButtonLink='/user-admin'
      />
    );
  }

  const [userDataForm, setUserDataForm] = useState({
    created_at: '',
    last_login: '',
    email: '',
    name: '',
    picture: '',
    roles: [],
    user_id: '',
  } as UserData);

  const [isAdminChecked, setIsAdminChecked] = useState(
    userToModify?.roles.includes('admin') || false
  );
  const [isEditorChecked, setIsEditorChecked] = useState(
    userToModify?.roles.includes('editor') || false
  );
  const toast = useToast();
  const opts = {
    audience: 'https://useradmin.gartnerihagen-askim.no',
    scope: 'update:users read:roles create:role_members',
  };

  // Populate the form with the current user data
  useEffect(() => {
    setUserDataForm({
      ...userToModify,
      roles: [...userToModify.roles],
    });
  }, []);

  // Add or remove roles to the userDataForm when checkboxes are clicked
  useEffect(() => {
    const newRoles = ['user']; // Should always have user as a role
    if (isAdminChecked) {
      newRoles.push('admin');
    }
    if (isEditorChecked) {
      newRoles.push('editor');
    }
    setUserDataForm({
      ...userToModify,
      roles: newRoles,
    });
  }, [isAdminChecked, isEditorChecked]);

  // Submits the form when the user clicks the "oppdater" button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoadingButton(true);

    // Ask if you are sure you want to update the user

    // Send userDataForm to Auth0 Management API to update user
    try {
      const accessToken = await getAccessTokenSilently(opts);
      const api = await fetch(`/api/admin-users/update-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify(userDataForm),
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

      if (data.error) {
        const { error_description } = JSON.parse(data?.error_description);
        throw new Error(`${data.error} : ${JSON.stringify(error_description)}`);
      }

      console.log('Brukeren er oppdatert: ', data.body);
    } catch (error) {
      console.error(error);

      toast({
        title: 'Noe gikk galt',
        description: `${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setShowLoadingButton(false);
    }

    // On the backend we will also set the new or updated user roles
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

  const updateUserAlert = (
    <AlertDialog
      isOpen={isUpdateAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg='white'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Logg ut
          </AlertDialogHeader>
          <AlertDialogBody>Er du sikker på at du vil logge ut?</AlertDialogBody>

          <AlertDialogFooter>
            <Button variant='standard' ref={cancelRef} onClick={onClose}>
              Avbryt
            </Button>
            <Button
              variant='danger'
              textColor='white'
              onClick={() => logout()}
              ml={3}
            >
              Logg ut
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

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
            <Text as='div' fontSize='sm' align='left'>
              <strong>Konto opprettet:</strong>{' '}
              {formatDate(userToModify?.created_at)}
            </Text>
            <Text as='div' fontSize='sm' align='left'>
              <strong>Sist innlogget: </strong>
              {userToModify?.last_login ? (
                <>{formatDate(userToModify?.last_login)}</>
              ) : (
                ' Aldri'
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
          </CheckboxGroup>

          <br />
          <Text align='left' fontSize='x-small'>
            ( Auth0 user_id: {userToModify?.user_id} )
          </Text>

          <Stack direction={['column', 'column', 'row', 'row']} py={8}>
            <Button
              minW='33%'
              minH='3rem'
              variant='menu-button'
              type='submit'
              isLoading={showLoadingButton}
              loadingText='Oppdaterer'
              _loading={{
                color: 'black',
              }}
            >
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
        {updateUserAlert}
      </Box>
    </>
  );
};

export default UpdateUserPage;

// TODO
// Make it possible to change user Image
// https://auth0.com/docs/users/change-user-picture
