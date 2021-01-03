import React from "react";
import { Flex } from "@chakra-ui/react";
import "./layout.css";
import Header from "../sections/header";
import Footer from "../sections/footer";

const Layout = (props) => (
  <Flex
    direction="column"
    align="center"
    maxW={{ xl: "1200px" }}
    m="0 auto"
    {...props}
  >
    <Header />
    {props.children}
    <Footer />
  </Flex>
);

export default Layout;
