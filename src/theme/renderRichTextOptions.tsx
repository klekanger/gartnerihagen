import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import ResponsiveImage from '../components/reponsiveImage';
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

const renderRichTextOptions = (links?: any) => {
  // Rich text received from gatsby-source-contentful (used on static pages) are received as raw,
  // while rich text received from Contentful GraphQL Content API via Apollo Client are received as json.
  // This means that we have to use two different approaches for rendering images in rich text, depending on whether
  // the image was fetched dynamically with Apollo Client, or is fetched build-time via gatsby-source-contentful.
  //
  // We'll check if rich text field is "raw" or "json". If json, create a map of the assets
  // and find the asset to display in the map when rendering an asset block

  // create an asset block map
  const assetBlockMap = new Map();
  // Check if links exists, if not that means that we're on a static page where rich text
  // are on a "raw" field. If links exists we should use our custom ResponsiveImage compoent for
  // rendering images instead of GatsbyImage
  if (links) {
    // loop through the assets and add them to the map
    for (const asset of links.assets.block) {
      assetBlockMap.set(asset.sys.id, asset);
    }
  }
  // Custom renderers of marks and nodes

  return {
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
        <Heading as='h1' textAlign='left' size='4xl'>
          {children}
        </Heading>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <Heading as='h2' textAlign='left' size='xl'>
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
        // If the image came from Contentful GraphQL content API via Apollo Client, the image url will
        // be found in the assetBlockMap. If the image came from gatsby-source-contentful,
        // the image will be found in gatsbyImageData
        let description;
        const asset = assetBlockMap.get(node.data.target.sys.id);
        const { gatsbyImageData, title } = node.data.target;
        if (asset) {
          description = asset.description;
        } else {
          description = node.data.target.description;
        }

        // Render the custom ResponsiveImage or the GatsbyImage component depending
        // on whether the image was fetched on build time by gatsby-source-contentful,
        // or runtime on the client via Apollo Client and Contentful Graphql content API
        const ImageToRender = asset ? (
          <ResponsiveImage url={asset.url} alt={description} />
        ) : (
          <Image
            as={GatsbyImage}
            image={gatsbyImageData}
            shadow='lg'
            rounded='md'
            alt={title}
          />
        );

        return (
          <Box>
            {ImageToRender}
            <Text
              as='p'
              textAlign='left'
              px={4}
              py={2}
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
};

export default renderRichTextOptions;
