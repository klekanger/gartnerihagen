/**
 * Returns a <picture> element with responsive images
 * used f.ex. when dynamically fetching Contentful images via Apollo client
 * as we are not able to use Gatsby Image in these cases. The Contentful
 * GraphQL Content API does not return the childImageSharp field we need for using Gatsby Image
 * Instead we receive the URL of the image file, and use the Contentful Images API (https://www.contentful.com/developers/docs/references/images-api/)
 * to make the different sizes and formats we need.
 *
 * @param {string} url The url of the image
 * @param {string} alt The alt text of the image
 *
 */

import * as React from 'react';

interface ICustomImageProps {
  url: string;
  alt: string;
}

// These are the default breakpoints used by gatsby-plugin-image. I guess they know what they're doing, and use the same...
// Breakpoints: 750, 1080, 1366, 1920

const ResponsiveImage = ({ url, alt = '', ...rest }: ICustomImageProps) => {
  const small = `${url}?w=750&&h=469&fit=fill&fm=webp 750w`;
  const medium = `${url}?w=1080&&h=675&fit=fill&fm=webp 1080w`;
  const large = `${url}?w=1366&h=854&fit=fill&&fm=webp 1366w`;
  const xlarge = `${url}?w=1920&h=1200&fit=fill&&fm=webp 1920w`;

  return (
    <div>
      <picture>
        <source media='(min-width: 1920px)' type='image/webp' srcSet={xlarge} />
        <source media='(min-width: 1366px)' type='image/webp' srcSet={large} />
        <source media='(min-width: 1080px)' type='image/webp' srcSet={medium} />
        <source type='image/webp' srcSet={small} />
        <img
          {...rest} // make sure we get passed in things from Chakra UI, like rounded corners, shadows, etc
          src={`${url}?w=1080&h=675&fit=fill&fl=progressive&q=50&fm=jpg`}
          alt={alt}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
