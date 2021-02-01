// ServiceBox
// Providing the user with useful links to documents etc.

import React from "react";
import { Box, Stack, HStack, VStack } from "@chakra-ui/react";

export default function ServiceBox() {
  return (
    <Box my={16} textAlign="left" py={0} mb={2} width="95vw">
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w={["95VW", "19vw"]} h="40px" bg="yellow.200">
          1
        </Box>
        <Box w={["95VW", "19vw"]} h="40px" bg="tomato">
          2
        </Box>
        <Box w={["95VW", "19vw"]} h="40px" bg="pink.100">
          3
        </Box>
        <Box w={["95VW", "19vw"]} h="40px" bg="pink.100">
          4
        </Box>
        <Box w={["95VW", "19vw"]} h="40px" bg="pink.100">
          5
        </Box>
      </Stack>
    </Box>
  );
}
