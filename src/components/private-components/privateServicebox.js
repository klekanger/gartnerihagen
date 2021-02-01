// ServiceBox
// Providing the user with useful links to documents etc.

import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

import { motion } from "framer-motion";

const MyBox = ({ children }) => {
  return (
    <Box
      w={["95vw", "95vw", "30%", "30%"]}
      h={["4rem", "6rem"]}
      p={3}
      bg="accent"
      rounded="md"
      shadow="lg"
      d="flex"
      alignItems="center"
      justifyContent="center"
      textColor="gray.200"
      fontSize={["md", "2xl", "2xl", "2xl"]}
      fontWeight="600"
      _hover={{
        transform: "scale(1.02)",
        transitionDuration: "0.1s",
        textColor: "white",
      }}
      _active={{
        transform: "scale(1.00)",
      }}
    >
      {children}
    </Box>
  );
};

export default function PrivateServiceBox() {
  return (
    <Box my={0} textAlign="left" py={0}>
      <Stack
        direction={["column", "column", "row", "row"]}
        justify="space-between"
        pb={0}
      >
        <MyBox>
          <Text textAlign="center">Vedtekter</Text>
        </MyBox>

        <MyBox>
          <Text textAlign="center">Retningslinjer</Text>
        </MyBox>
        <MyBox>
          <Text textAlign="center">Klippeliste</Text>
        </MyBox>
      </Stack>
      <Stack
        direction={["column", "column", "row", "row"]}
        justify="space-between"
        pt={2}
      >
        <MyBox>
          <Text textAlign="center">Oversikt over beboere</Text>
        </MyBox>
        <MyBox>
          <Text textAlign="center">Referater fra årsmøter</Text>
        </MyBox>
        <MyBox>
          <Text textAlign="center">Diverse dokumenter</Text>
        </MyBox>
      </Stack>
    </Box>
  );
}
