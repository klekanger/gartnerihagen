import React, { useContext } from "react";
import Layout from "../layouts/layout";
import { Box, Heading, Text } from "@chakra-ui/react";
import { IdentityContext } from "../../identity-context";
import ArticleGrid from "../../components/sections/articleGrid";
import PrivateInfo from "./privateInfo";

export default function PrivateMain() {
  const { user, netlifyIdentity } = useContext(IdentityContext);

  const userName = user?.user_metadata?.full_name;
  console.log(userName);

  return (
    <Layout>
      <Box>
        <Heading as="h1" pt={8} pb={2}>
          Informasjon fra Boligsameiet Gartnerihagen
        </Heading>
        <Text as="p">Du er logget inn som: {userName}</Text>
        <PrivateInfo />
        <Heading as="h1" pt={8} pb={2}>
          Siste blogginnlegg
        </Heading>
        <ArticleGrid />
      </Box>
    </Layout>
  );
}
