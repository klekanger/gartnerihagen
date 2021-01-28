import React, { useContext } from "react";
import Layout from "../layouts/layout";
import { Box, Heading, Text } from "@chakra-ui/react";
import { IdentityContext } from "../../identity-context";
import ArticleGrid from "../../components/sections/articleGrid";
import PrivateInfoList from "./privateInfoList";

export default function PrivateMain() {
  const { user, netlifyIdentity } = useContext(IdentityContext);

  const userName = user?.user_metadata?.full_name;

  return (
    <Layout>
      <Box>
        <PrivateInfoList />
        <Heading
          as="h1"
          size="2xl"
          pt={8}
          pb={2}
          textAlign="left"
          maxWidth="95vw"
        >
          Siste blogginnlegg
        </Heading>
        <ArticleGrid />
      </Box>
    </Layout>
  );
}
