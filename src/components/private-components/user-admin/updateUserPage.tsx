import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PageProps } from 'gatsby';
import { navigate } from 'gatsby';
import { formatDate } from '../../../utils/formatDate';
import ErrorPage from '../../errorPage';
import { requestChangePassword } from '../requestChangePassword';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Flex,
  Button,
  Stack,
  Input,
  Image,
  FormControl,
  FormLabel,
  Tooltip,
  useToast,
  Text,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';
import { API } from '@sentry/core';

interface UserData {
  created_at: string;
  last_login?: string;
  email: string;
  name: string;
  picture?: string;
  roles: string[];
  user_id: string;
  user_metadata: {
    subscribeToEmails: boolean;
  };
}

const UpdateUserPage = (props: PageProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [isUpdateAlertOpen, setIsUpdateAlertOpen] = useState(false);
  const onClose = () => setIsUpdateAlertOpen(false);
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

  const [hasSubscribedToEmail, setHasSubscribedToEmail] = useState(
    userToModify?.user_metadata?.subscribeToEmails || false
  );

  const [userDataForm, setUserDataForm] = useState({
    created_at: '',
    last_login: '',
    email: '',
    name: '',
    picture: '',
    roles: [],
    user_metadata: {
      subscribeToEmails: hasSubscribedToEmail,
    },
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
      user_metadata: {
        ...userToModify.user_metadata,
        subscribeToEmails: hasSubscribedToEmail,
      },
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

    setUserDataForm((prevState) => {
      return { ...prevState, roles: newRoles };
    });
  }, [isAdminChecked, isEditorChecked]);

  // Update the user data form when the subscribe to email checkbox is clicked
  useEffect(() => {
    setUserDataForm((prevState) => {
      return {
        ...prevState,
        user_metadata: {
          subscribeToEmails: hasSubscribedToEmail,
        },
      };
    });
  }, [hasSubscribedToEmail]);

  // Submits the form when the user clicks the "oppdater" button
  const handleSubmit = async () => {
    setShowLoadingButton(true);
    setIsUpdateAlertOpen(false);

    // Send userDataForm to Auth0 Management API to update user
    try {
      const accessToken = await getAccessTokenSilently(opts);
      const api = await fetch(`/api/admin-users/update-user`, {
        method: 'PATCH',
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
        throw new Error(data.error);
      }

      toast({
        title: `Bruker ${data?.body?.user?.name} er oppdatert`,
        description: 'Returnerer til brukeradministrasjon.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      navigate(`/user-admin`);
    } catch (error) {
      toast({
        title: 'Noe gikk galt',
        description: `${error.name} - ${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setShowLoadingButton(false);
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
            Oppdater bruker {userToModify?.name}
          </AlertDialogHeader>
          <AlertDialogBody>
            Er du sikker på at du vil oppdatere brukeren?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant='standard-light' ref={cancelRef} onClick={onClose}>
              Avbryt
            </Button>
            <Button
              variant='danger'
              textColor='white'
              onClick={() => handleSubmit()}
              ml={3}
            >
              Ja - oppdater
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
                setUserDataForm((prevState) => {
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
              value={userDataForm?.name}
              placeholder='Fornavn Etternavn'
              onChange={(e) =>
                setUserDataForm((prevState) => {
                  return {
                    ...prevState,
                    name: e.target.value,
                  };
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

          <br />
          <Text align='left' fontSize='x-small'>
            ( Auth0 user_id: {userToModify?.user_id} )
          </Text>
          <Stack direction={['column', 'column', 'row', 'row']} py={8}>
            <Button
              minW='33%'
              minH='3rem'
              variant='standard-light'
              onClick={() => setIsUpdateAlertOpen(true)}
              isLoading={showLoadingButton}
              loadingText='Oppdaterer'
              _loading={{
                color: 'black',
              }}
              _hover={{ bg: 'hoverButtonColor' }}
            >
              Oppdater
            </Button>
            <Button
              minW='33%'
              minH='3rem'
              variant='standard-light'
              onClick={() => requestChangePassword(userToModify?.email)}
              _hover={{ bg: 'hoverButtonColor' }}
            >
              Bytt passord
            </Button>
            <Button
              minW='33%'
              minH='3rem'
              variant='danger'
              onClick={() => navigate('/user-admin')}
              _hover={{ bg: 'hoverButtonDangerColor' }}
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
