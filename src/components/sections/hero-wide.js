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
  Container,
} from "@chakra-ui/react";

const HeroWide = () => {
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
    <Box w="100%" m="0" p="0">
      <Image
        as={GatsbyImage}
        fluid={pageImage.fluid}
        alt={imageDesc}
        height="100vh"
      />

      <Heading
        as="h1"
        bgGradient="linear(to-br, gray.900, gray.700)"
        rounded="md"
        size="2xl"
        fontWeight="bold"
        color="white"
        opacity="70%"
        position="absolute"
        textAlign={["center", "center", "left", "left"]}
        top={280}
        left={16}
        width="60vw"
        padding={4}
      >
        {pageTitle}
        <Text
          fontSize={{ base: "2xl", sm: "md", md: "lg" }}
          fontWeight="400"
          my={4}
        >
          {excerpt}
        </Text>
        <Link to="/">
          <Button
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="xl"
            shadow="lg"
            fontSize="xl"
            bgColor="white"
            color="black"
          >
            Les mer
          </Button>
        </Link>
      </Heading>
    </Box>
  );
};

export default HeroWide;
