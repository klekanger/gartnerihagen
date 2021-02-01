import React from "react";
import { Flex, Text, Link, Box } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <hr />
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={0}
        py={10}
        px={10}
        bgColor="dark"
        color="gray.300"
        opacity="90%"
        fontSize="sm"
        direction={["column", "column", "row", "row"]}
      >
        <Box>
          <Text mb={[4, 4, 0, 0]}>
            &copy; {currentYear} Boligsameiet Gartnerihagen{" "}
          </Text>

          <Text
            mb={[4, 4, 0, 0]}
            textAlign={["center", "center", "left", "left"]}
          >
            <Link
              as={GatsbyLink}
              to="/cookies-og-personvern-gdpr"
              _hover={{ textDecor: "none" }}
            >
              Personvernerklæring
            </Link>
          </Text>
        </Box>
        <Text mb={[4, 4, 0, 0]}>
          Epost:{" "}
          <Link
            href="mailto:gartnerihagen@gmail.com"
            _hover={{ textDecor: "none", color: "blue.500" }}
          >
            gartnerihagen@gmail.com
          </Link>{" "}
          <br />
          Telefon: +47 - 4021 0140{" "}
        </Text>
        <Text mb={[4, 4, 0, 0]}>
          Webdesign:{" "}
          <Link
            href="https://www.lekanger.no"
            _hover={{ textDecor: "none", color: "blue.500" }}
          >
            Kurt Lekanger
          </Link>
        </Text>
      </Flex>
    </>
  );
}
