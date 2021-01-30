import React, { useRef, useEffect, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import { MotionBox } from "../../utils/MotionBox";
import debounce from "../../utils/debounce";
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
            fluid(maxWidth: 3000) {
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

  // Get the height of the header and intro text
  // This is used for setting the correct height of the transparent background behind the text
  const handleResize = () => {
    if (targetRef.current) {
      setDimensions({
        height: targetRef.current.offsetHeight,
        width: targetRef.current.offsetWidth,
      });
    }
  };

  useEffect(() => {
    handleResize();
    // Using debounce utility function for better performance
    // Exammple: 2nd parameter = 100. Will run the function every 100 ms.
    window.addEventListener("resize", debounce(handleResize, 100));
    return () => {
      window.removeEventListener("resize", debounce(handleResize, 100));
    };
  }, []);

  return (
    <Box w="95vw" mx="0" mt={[0, 8, 8, 8]} mb={12} shadow="lg">
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
            h={["50vh", "70vh", "80vh", "80vh"]}
          />
        </MotionBox>
      </Box>

      <Box
        bgColor="rgba(0,46,85,0.7)"
        w={["90vw", "90vw", "80vw", "60vw"]}
        h={dimensions.height} // Set height of transparent background drop to height of text/heading container
        position="absolute"
        top={[120, 200, 200, 200]}
        left={[4, 4, 16, 16]}
      >
        <Heading
          as="h1"
          fontWeight="semibold"
          fontSize={["4xl", "4xl", "6xl", "6xl"]}
          color="gray.50"
          position="absolute"
          textAlign={["center", "left", "left", "left"]}
          padding={[2, 4, 8, 8]}
          ref={targetRef} // Ref for all the text + button in the intro text
        >
          {pageTitle}
          <Text
            fontSize={{ base: "xs", sm: "sm", md: "lg" }}
            fontWeight="normal"
            lineHeight="normal"
            mt={3}
            mb={5}
          >
            {excerpt}
          </Text>
          <Link to="/om-boligsameiet-gartnerihagen">
            <Button
              variant="standard"
              borderRadius="8px"
              mb={4}
              px={[2, 5, 5, 5]}
              py={[2, 7, 7, 7]}
              fontSize={[12, 20, 20, 20]}
              lineHeight="1"
              shadow="lg"
              _hover={{ bgColor: "gray.100" }}
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
