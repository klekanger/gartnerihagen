import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import Footer from '../sections/footer';
import Header from '../sections/header';
import './layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <Flex direction='column' m='auto' align='center' minH='100vh' {...props}>
      <Header />
      <Box pb={20} />
      {props.children}
      <Box flexGrow={1}>
        {/*  Needed to push footer to bottom if there's little content */}
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;
