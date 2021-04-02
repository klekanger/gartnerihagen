import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  Heading,
  Text,
  ListItem,
  Image,
  Box,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
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
        my={8}
        fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <Heading as='h1' textAlign='left' size='4xl' pt={8}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Heading as='h2' textAlign='left' size='xl' pt={8}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Heading as='h3' textAlign='left' size='lg' pt={8}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Heading as='h4' textAlign='left' size='md' pt={8}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Heading as='h5' textAlign='left' size='sm' pt={8}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <Heading as='h6' textAlign='left' size='sm' pt={8}>
        {children}
      </Heading>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <UnorderedList textAlign='left' my={8}>
        {children}
      </UnorderedList>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <OrderedList textAlign='left' my={8}>
        {children}
      </OrderedList>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { gatsbyImageData, description, title } = node.data.target;

      return (
        <Box>
          <Image
            as={GatsbyImage}
            image={gatsbyImageData}
            size='100%'
            shadow='lg'
            rounded='md'
            alt={title}
          />
          <Text
            as='p'
            textAlign='left'
            p={4}
            mb={[0, 0, 4, 4]}
            bgColor='#efefef'
            fontSize={['sm', 'sm', 'sm', 'md']}
          >
            <em>{description}</em>
          </Text>
        </Box>
      );
    },
  },
};

export default renderRichTextOptions;
