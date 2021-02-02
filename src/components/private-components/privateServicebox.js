// ServiceBox
// Providing the user with useful links to documents etc.

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Box, Stack, Text } from "@chakra-ui/react";

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
  const data = useStaticQuery(graphql`
    query MyQuery {
      menuItems: contentfulServiceMenu(serviceMenuTitle: { eq: "infomeny" }) {
        id
        menu1
        menu1File {
          file {
            url
          }
        }
        menu2
        menu2File {
          file {
            url
          }
        }
        menu3
        menu3File {
          file {
            url
          }
        }
        menu4
        menu4File {
          file {
            url
          }
        }
        menu5
        menu5Files {
          file {
            url
          }
        }
        menu6
        menu6Files {
          file {
            url
          }
        }
      }
    }
  `);

  const { menuItems } = data;

  return (
    <Box my={0} textAlign="left" py={0}>
      <Stack
        direction={["column", "column", "row", "row"]}
        justify="space-between"
        pb={0}
        my={["2", "2", "4", "4"]}
      >
        <MyBox>
          <Text textAlign="center">{menuItems.menu1}</Text>
        </MyBox>

        <MyBox>
          <Text textAlign="center">{menuItems.menu2}</Text>
        </MyBox>
        <MyBox>
          <Text textAlign="center">{menuItems.menu3}</Text>
        </MyBox>
      </Stack>
      <Stack
        direction={["column", "column", "row", "row"]}
        justify="space-between"
        pt={0}
      >
        <MyBox>
          <Text textAlign="center">{menuItems.menu4}</Text>
        </MyBox>
        <MyBox>
          <Text textAlign="center">{menuItems.menu5}</Text>
        </MyBox>
        <MyBox>
          <Text textAlign="center">{menuItems.menu6}</Text>
        </MyBox>
      </Stack>
    </Box>
  );
}
