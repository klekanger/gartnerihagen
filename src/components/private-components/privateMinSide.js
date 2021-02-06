import React from "react";
import Layout from "../layouts/layout";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function PrivateMain() {
  return (
    <Layout>
      <Box
        w="95vw"
        ml="0"
        pr={["0", "0", "5vw", "30vw"]}
        mb={[4, 4, 16, 16]}
        textAlign="left"
      >
        <Heading
          as="h1"
          size="2xl"
          pt={[0, 0, 8, 8]}
          pb={[0, 0, 4, 4]}
          textAlign="left"
          maxWidth="95vw"
        >
          Min side
        </Heading>
        <Text>
          Her kommer en side for å redigere profil for innlogget bruker.
        </Text>
      </Box>
    </Layout>
  );
}

// TODO
// Vise info for innlogget bruker
// Vise skjema for endring av opplysninger
// Mulighet for å endre passord
