import React from "react";
import { Heading } from "@chakra-ui/react";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import Image from "gatsby-image";
import { useContentfulImage } from "../utils/useContentfulImage";

const renderRichTextOptions = {
  renderMark: {},
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <Heading as="h1">{children}</Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Heading as="h2">{children}</Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Heading as="h3">{children}</Heading>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Heading as="h4">{children}</Heading>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Heading as="h5">{children}</Heading>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <Heading as="h6">{children}</Heading>
    ),
    /*     [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return <Heading as="p">BILDE</Heading>;
    }, */
  },
};

export default renderRichTextOptions;

// TO DO
//
// 1. Make custom hook to connect the nodeId to the fluid image in the rich text
// 2. Render image with Gatsby Image in renderRichTextOptions
// https://github.com/contentful/rich-text/issues/70

// FIX Image rendering in Rich Text. https://github.com/contentful/rich-text/issues/70
