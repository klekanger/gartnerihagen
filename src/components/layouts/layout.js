import React from 'react';
import { Box } from '@chakra-ui/react';
import './layout.css';
import Header from '../sections/header';
import Footer from '../sections/footer';

const Layout = (props) => (
  <Box direction='column' align='center' m='0 auto' {...props}>
    <Header {...props} />
    <Box pb={20} />
    {props.children}
    <Footer />
  </Box>
);

export default Layout;
