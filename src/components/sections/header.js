import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Link as GatsbyLink } from "gatsby";
import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineUp } from "react-icons/ai";
import { IoFlowerOutline } from "react-icons/io5";

import { IdentityContext } from "../../identity-context";

// Render one menu item
const MenuItems = (props) => {
  const { children, isLast, to = "/", ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      fontSize="md"
      display="block"
      {...rest}
    >
      <Link as={GatsbyLink} to={to} _hover={{ textDecor: "none" }}>
        {children}
      </Link>
    </Text>
  );
};

// Main header component
const Header = (props) => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const toggleMenu = () => setShowMenuItems(!showMenuItems);
  const { user, netlifyIdentity } = useContext(IdentityContext);

  // Hide menu if scrolled more than 15 % of the screen height
  const handleScroll = () => {
    const yPos = window.scrollY || 0;
    const scrHeight = window.innerHeight || 900;
    yPos > (scrHeight / 100) * 15 ? setHideMenu(true) : setHideMenu(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loginButtonText = user
    ? user?.user_metadata.full_name.slice(0, 6).padEnd(9, ".")
    : "Logg inn";

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={4}
      mt={hideMenu ? "-100" : "0"}
      py={3}
      px={10}
      {...props}
      bgColor="#002E55"
      opacity="90%"
      position="fixed"
      zIndex="2"
      shadow="md"
      color="gray.300"
      transition="margin-top 0.5s"
    >
      <Link
        as={GatsbyLink}
        to="/"
        _hover={{ textDecor: "none" }}
        fontSize="2xl"
      >
        <IoFlowerOutline style={{ color: "#A2B25C", marginTop: "-5px" }} />{" "}
        Boligsameiet Gartnerihagen
      </Link>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {showMenuItems ? (
          <AiOutlineUp className="menuClose" size="2em" />
        ) : (
          <AiOutlineMenu className="menuOpen" size="2em" />
        )}
      </Box>
      <Box
        display={{ base: showMenuItems ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/informasjon">For beboere</MenuItems>
          <MenuItems to="/blogg">Blogg</MenuItems>
          <MenuItems to="/om-boligsameiet-gartnerihagen">Om oss</MenuItems>
          <MenuItems to="/styret" isLast>
            Styret
          </MenuItems>

          <Button
            variant="menu-button"
            size="md"
            fontSize="sm"
            fontWeight={600}
            rounded="md"
            ml={{ base: "0px", md: "20px", lg: "30px" }}
            mt={{ base: "20px", sm: "0px" }}
            onClick={() => netlifyIdentity.open()}
          >
            {loginButtonText}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
