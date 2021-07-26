import * as React from 'react';
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
} from '@chakra-ui/react';

const UserAdminCreateUser = () => {
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

        <FormControl id='email' isRequired>
          <FormLabel>Epost-adresse</FormLabel>
          <Input type='email' />
        </FormControl>

        <FormControl id='name' isRequired>
          <FormLabel>Fornavn og etternavn</FormLabel>
          <Input />
        </FormControl>

        <FormControl id='password' isRequired>
          <FormLabel>Passord</FormLabel>
          <Input />
        </FormControl>
        <FormControl id='repeat-password' isRequired>
          <FormLabel>Gjenta passord</FormLabel>
          <Input />
        </FormControl>

        <FormControl as='fieldset'>
          <RadioGroup defaultValue='user' mt={8}>
            <Stack direction='row'>
              <Radio value='user'>Bruker</Radio>
              <Radio value='editor'>Redaktør</Radio>
              <Radio value='admin'>Administrator</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Stack direction={['column', 'column', 'row', 'row']} py={8}>
          <Button
            minW='50%'
            minH='3rem'
            variant='standard'
            onClick={() => logout()}
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
      </Box>
    </>
  );
};

export default UserAdminCreateUser;
