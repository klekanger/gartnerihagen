/**
 * Returns a <picture> element with responsive images
 * used when dynamically fetching Contentful images via Apollo client
 * as we are not able to use Gatsby Image in these cases. The Contentful
 * GraphQL Content API does not return the childImageSharp field we need for using Gatsby Image
 * Instead we receive the URL of the image file, and use the Contentful Images API (https://www.contentful.com/developers/docs/references/images-api/)
 * to make the different sizes and formats we need.
 *
 * @param {string} url The url of the image
 * @param {string} alt The alt text of the image
 * @param {number|undefined} [aspectRatio] Define the aspect ratio (eg. 1.6 for 16:10)
 *
 */

import * as React from 'react';
import { ICustomImageProps } from '../types/interfaces';

// These are the default breakpoints used by gatsby-plugin-image. I guess they know what they're doing, and use the same...
// Breakpoints: 750, 1080, 1366, 1920
const IMG_SIZE_SMALL = 750;
const IMG_SIZE_MEDIUM = 1080;
const IMG_SIZE_LARGE = 1366;
const IMG_SIZE_XLARGE = 1920;

const ResponsiveImage = ({
  url,
  alt = '',
  aspectRatio,
  ...rest
}: ICustomImageProps) => {
  // Make URLs for the different image sizes we need in the picture tag
  // The images are fetched from Contentfuls Image API
  const smallHeight = aspectRatio
    ? `h=${Math.floor(IMG_SIZE_SMALL / aspectRatio)}`
    : '';
  const mediumHeight = aspectRatio
    ? `h=${Math.floor(IMG_SIZE_MEDIUM / aspectRatio)}`
    : '';
  const largeHeight = aspectRatio
    ? `h=${Math.floor(IMG_SIZE_LARGE / aspectRatio)}`
    : '';
  const xlargeHeight = aspectRatio
    ? `h=${Math.floor(IMG_SIZE_XLARGE / aspectRatio)}`
    : '';

  const smallUrl = `${url}?w=750&&${smallHeight}&fit=fill&fm=webp 750w`;
  const mediumUrl = `${url}?w=1080&&${mediumHeight}&fit=fill&fm=webp 1080w`;
  const largeUrl = `${url}?w=1366&${largeHeight}&fit=fill&&fm=webp 1366w`;
  const xlargeUrl = `${url}?w=1920&${xlargeHeight}&fit=fill&&fm=webp 1920w`;

  return (
    <div>
      <picture>
        <source
          media='(min-width: 1920px)'
          type='image/webp'
          srcSet={xlargeUrl}
        />
        <source
          media='(min-width: 1366px)'
          type='image/webp'
          srcSet={largeUrl}
        />
        <source
          media='(min-width: 1080px)'
          type='image/webp'
          srcSet={mediumUrl}
        />
        <source type='image/webp' srcSet={smallUrl} />
        <img
          {...rest} // make sure we get passed in things from Chakra UI, like rounded corners, shadows, etc
          src={`${url}?w=1080&h=${mediumHeight}fit=fill&fl=progressive&q=50&fm=jpg`}
          alt={alt}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
