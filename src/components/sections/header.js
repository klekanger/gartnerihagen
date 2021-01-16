import React, { useState } from "react";
import { Link as GatsbyLink } from "gatsby";
import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineUp } from "react-icons/ai";
/* import ThemeToggle from "../toggle-theme.js"; */

const MenuItems = (props) => {
  const { children, isLast, to = "/", ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link as={GatsbyLink} to={to} _hover={{ textDecor: "none" }}>
        {children}
      </Link>
    </Text>
  );
};

const Header = (props) => {
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={4}
      py={3}
      px={10}
      {...props}
      bgColor="gray.200"
      opacity="50%"
      position="fixed"
      zIndex="2"
      shadow="md"
    >
      <Flex align="center">
        <Link as={GatsbyLink} to="/" _hover={{ textDecor: "none" }}>
          Boligsameiet Gartnerihagen
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? (
          <AiOutlineUp className="menuClose" size="2em" />
        ) : (
          <AiOutlineMenu className="menuOpen" size="2em" />
        )}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/informasjon">Informasjon</MenuItems>
          <MenuItems to="/blogg">Blogg</MenuItems>
          <MenuItems to="/styret" isLast>
            Styret
          </MenuItems>
          <Button
            size="md"
            rounded="md"
            ml={{ base: "0px", md: "20px", lg: "30px" }}
            mt={{ base: "20px", sm: "0px" }}
          >
            Logg inn
          </Button>
          {/*  <ThemeToggle /> */}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
