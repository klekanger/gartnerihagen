import React from "react";
import Layout from "../layouts/layout";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function NotLoggedIn() {
  return (
    <Layout>
      <Box>
        <Heading as="h1">Du må være logget inn for å se denne siden.</Heading>
        <Text as="p">Ta kontakt med styret for å få konto for innlogging.</Text>
      </Box>
    </Layout>
  );
}
