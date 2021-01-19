import React, { useRef, useLayoutEffect, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import { MotionBox } from "../../utils/MotionBox";
import { Box, Button, Image, Heading, Text } from "@chakra-ui/react";

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

  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useLayoutEffect(() => {
    // Get the height of the header and intro text
    // This is used for setting the correct height of the transparent background behind the text

    if (targetRef.current) {
      setDimensions({
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

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
        h={dimensions.height} // Set height of transparent background drop to height of text/heading container
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
          ref={targetRef} // Ref for all the text + button in the intro text
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
