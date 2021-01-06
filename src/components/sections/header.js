import React, { useState } from "react";
import { Link } from "gatsby";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineUp } from "react-icons/ai";

const MenuItems = (props) => {
  const { children, isLast, to = "/", ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to}>{children}</Link>
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
      p={3}
      {...props}
    >
      <Flex align="center">
        <div>LOGO</div>
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
          <Button size="md" rounded="md" ml="20px">
            Logg inn
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
