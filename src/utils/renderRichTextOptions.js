import React from "react";
import {
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Image,
} from "@chakra-ui/react";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

import GatsbyImage from "gatsby-image";
import { useContentfulImage } from "../utils/useContentfulImage";

const Bold = ({ children }) => <span className="bold">{children}</span>;

const renderRichTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Text textAlign="left">{children}</Text>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <Heading as="h1" textAlign="left">
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Heading as="h2" textAlign="left">
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Heading as="h3" textAlign="left">
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Heading as="h4" textAlign="left">
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Heading as="h5" textAlign="left">
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <Heading as="h6" textAlign="left">
        {children}
      </Heading>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <List textAlign="left" mx={10} my={4}>
        {children}
      </List>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <List as="ol" textAlign="left" mx={10} my={4}>
        {children}
      </List>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      console.log("BILDE ", node);
      return <div>BILDE</div>;
    },
  },
};

export default renderRichTextOptions;

// TO DO
//
// 1. Make custom hook to connect the nodeId to the fluid image in the rich text
// 2. Render image with Gatsby Image in renderRichTextOptions
// https://github.com/contentful/rich-text/issues/70

// FIX Image rendering in Rich Text. https://github.com/contentful/rich-text/issues/70

// Render bullet points and numbering in lists
