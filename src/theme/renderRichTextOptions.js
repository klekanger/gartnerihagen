import React from 'react';
import GatsbyImage from 'gatsby-image';
import { Heading, Text, List, ListItem, Image, Box } from '@chakra-ui/react';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const renderRichTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Text
        textAlign='left'
        my={4}
        fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <Heading as='h1' textAlign='left' size='4xl' pt={3}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Heading as='h2' textAlign='left' size='3xl' pt={3}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Heading as='h3' textAlign='left' size='2xl' pt={3}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Heading as='h4' textAlign='left' size='xl' pt={3}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Heading as='h5' textAlign='left' size='lg' pt={3}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <Heading as='h6' textAlign='left' size='md' pt={3}>
        {children}
      </Heading>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <List textAlign='left' mx={10} my={4}>
        {children}
      </List>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <List as='ol' textAlign='left' mx={10} my={4}>
        {children}
      </List>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { fluid, description, title } = node.data.target;

      return (
        <Box>
          <Image
            as={GatsbyImage}
            fluid={fluid}
            size='100%'
            shadow='lg'
            alt={description}
          />
          <Text
            as='p'
            textAlign='left'
            ml={2}
            p={2}
            fontSize={['sm', 'sm', 'sm', 'md']}
          >
            <em>
              {title}: {description}
            </em>
          </Text>
        </Box>
      );
    },
  },
};

export default renderRichTextOptions;
