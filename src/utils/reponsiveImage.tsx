/**
 *
 *
 *
 */

import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import * as React from 'react';

interface ICustomImageProps {
  url: string;
  alt: string;
}

// Breakpoints used by gatsby-plugin-image. I'll use the same...
//  [750, 1080, 1366, 1920]

const ResponsiveImage = ({ url, alt, ...rest }: ICustomImageProps) => {
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
          {...rest}
          src={`${url}?w=1080&h=675&fit=fill&fl=progressive&q=50&fm=jpg`}
          alt={alt}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
