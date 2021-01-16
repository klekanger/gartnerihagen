import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";

import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

const Hero = () => {
  const data = useStaticQuery(
    graphql`
      query {
        contentfulForsidetekst {
          contentful_id
          pageTitle
          excerpt {
            excerpt
          }
          contentful_id
          pageImage {
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
            title
            imageDesc: description
          }
          buttonLink {
            contentful_id
            pageTitle
          }
        }
      }
    `
  );

  const {
    pageTitle,
    excerpt: { excerpt },
    pageImage,
    pageImage: { imageDesc },
  } = data.contentfulForsidetekst;

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="40vh"
      mb={8}
      maxWidth="85vw"
      p={0}
    >
      <Stack
        spacing={4}
        mr="20px"
        w={{ base: "100%", md: "50%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="2xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {pageTitle}

          <Text
            fontSize={{ base: "2xl", sm: "md", md: "lg" }}
            fontWeight="400"
            my={4}
          >
            {excerpt}
          </Text>
        </Heading>

        <Link to="/">
          <Button
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="xl"
            shadow="lg"
            fontSize="xl"
          >
            Les mer
          </Button>
        </Link>
      </Stack>

      <Box w={{ base: "100%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image
          as={GatsbyImage}
          fluid={pageImage.fluid}
          size="100%"
          rounded="0.5rem"
          shadow="lg"
          alt={imageDesc}
          ml={2}
        />
      </Box>
    </Flex>
  );
};

export default Hero;
