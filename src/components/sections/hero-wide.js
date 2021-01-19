import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import { MotionBox } from "../../utils/MotionBox";
import { Box, Button, Image, Heading, Text, Container } from "@chakra-ui/react";

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
    <Box w="100%" mx="0" mt={-20} mb={20} p="0" shadow="lg">
      <Box as="div" overflow="hidden">
        <MotionBox
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.5 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            as={GatsbyImage}
            fluid={pageImage.fluid}
            alt={imageDesc}
            height="100vh"
          />
        </MotionBox>
      </Box>

      <Box
        bgColor="rgba(0,46,85,0.7)"
        rounded="md"
        shadow="lg"
        w="60vw"
        h="50vh"
        position="absolute"
        top={200}
        left={16}
      >
        <Heading
          as="h1"
          size="3xl"
          fontWeight="semibold"
          color="gray.50"
          position="absolute"
          textAlign={["center", "center", "left", "left"]}
          padding={8}
        >
          {pageTitle}
          <Text
            fontSize={{ base: "2xl", sm: "md", md: "lg" }}
            fontWeight="normal"
            lineHeight="normal"
            my={4}
          >
            {excerpt}
          </Text>
          <Link to="/om-boligsameiet-gartnerihagen">
            <Button
              variant="standard"
              borderRadius="8px"
              mt={4}
              py={4}
              px={4}
              lineHeight="1"
              size="xl"
              shadow="lg"
              fontSize="xl"
            >
              Les mer
            </Button>
          </Link>
        </Heading>
      </Box>
    </Box>
  );
};

export default HeroWide;
