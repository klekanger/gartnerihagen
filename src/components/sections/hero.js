import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import renderRichTextOptions from "../../utils/renderRichTextOptions";

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
  const {
    data: {
      nodes: [{ pageTitle, pageText, pageImage }],
    },
  } = useStaticQuery(
    graphql`
      query {
        data: allContentfulSide {
          nodes {
            contentful_id
            pageTitle
            pageText {
              raw
              references {
                ... on ContentfulAsset {
                  contentful_id
                  fluid(maxWidth: 1000) {
                    ...GatsbyContentfulFluid_withWebp
                  }
                }
              }
            }
            pageImage {
              contentful_id
              description
              title
              fluid(maxWidth: 1000) {
                src
                srcWebp
              }
            }
          }
        }
      }
    `
  );

  const imageDesc = pageImage.description;
  const imageSrc = pageImage.fluid.srcWebp;

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="40vh"
      px={8}
      mb={16}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {pageTitle}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          <Text fontSize="md">
            {renderRichText(pageText, renderRichTextOptions)}
          </Text>
        </Heading>

        <Link to="/">
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
            <div>Les mer</div>
          </Button>
        </Link>
      </Stack>

      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image
          src={imageSrc}
          size="100%"
          rounded="1rem"
          shadow="2xl"
          alt={imageDesc}
        />
      </Box>
    </Flex>
  );
};

export default Hero;
