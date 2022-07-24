import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { LayoutProps } from '../../types/interfaces';
import Footer from '../sections/footer';
import Header from '../sections/header';
import './layout.css';

function Layout(props: LayoutProps) {
  return (
    <Flex direction='column' m='auto' align='center' minH='100vh' {...props}>
      <Header />
      <Box pb={20} />
      {props.children}
      <Footer />
    </Flex>
  );
}

export default Layout;
