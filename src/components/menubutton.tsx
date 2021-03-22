import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Box, Stack, Text } from '@chakra-ui/react';

interface IMenuButton {
  multiLink?: boolean;
  children: React.ReactNode;
  linkTo?: string;
  to?: string;
}

export default function MenuButton(props: IMenuButton) {
  if (!props.multiLink) {
    return (
      <Box
        as='a'
        href={props.linkTo || null}
        target='_blank'
        rel='noopener noreferrer'
        w={['95vw', '95vw', '30%', '30%']}
        h={['4rem', '6rem']}
        p={3}
        bg='tertiaryButton'
        rounded='md'
        shadow='lg'
        d='flex'
        alignItems='center'
        justifyContent='center'
        fontSize={['md', '2xl', '2xl', '2xl']}
        fontWeight='600'
        _hover={{
          transform: 'scale(1.02)',
          transitionDuration: '0.1s',
          textColor: 'white',
        }}
        _active={{
          transform: 'scale(1.00)',
        }}
      >
        {props.children}
      </Box>
    );
  } else {
    return (
      <Box
        as={GatsbyLink}
        to={props.to || '#'}
        w={['95vw', '95vw', '30%', '30%']}
        h={['4rem', '6rem']}
        p={3}
        bg='tertiaryButton'
        rounded='md'
        shadow='lg'
        d='flex'
        alignItems='center'
        justifyContent='center'
        fontSize={['md', '2xl', '2xl', '2xl']}
        fontWeight='600'
        target='_blank'
        rel='noopener noreferrer'
        _hover={{
          transform: 'scale(1.02)',
          transitionDuration: '0.1s',
          textColor: 'white',
        }}
        _active={{
          transform: 'scale(1.00)',
        }}
      >
        {props.children}
      </Box>
    );
  }
}
