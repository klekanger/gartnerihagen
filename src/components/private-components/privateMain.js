import React from "react";
import Layout from "../layouts/layout";
import { Box, Heading } from "@chakra-ui/react";

import ArticleGrid from "../../components/sections/articleGrid";
import PrivateInfoList from "./privateInfoList";

export default function PrivateMain() {
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
