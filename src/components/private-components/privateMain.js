import React from "react";
import Layout from "../layouts/layout";
import { Box, Heading } from "@chakra-ui/react";
import PrivateServiceBox from "./privateServicebox";
import ArticleGrid from "../../components/sections/articleGrid";
import PrivateInfoList from "./privateInfoList";

export default function PrivateMain() {
  return (
    <Layout>
      <Box w="95vw" ml="0" pr={["0", "0", "5vw", "30vw"]}>
        <PrivateServiceBox />
        <PrivateInfoList />
        <Heading
          as="h1"
          size="2xl"
          pt={8}
          pb={8}
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
