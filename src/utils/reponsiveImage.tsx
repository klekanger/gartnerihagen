import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import * as React from 'react';

interface ICustomImageProps {
  src: string;
  alt: string;
}

const ResponsiveImage = ({
  src,
  alt,
  ...rest
}: ICustomImageProps): JSX.Element => {
  const small = `${src}?w=400`;
  const medium = `${src}?w=800`;
  const large = `${src}?w=1600`;
  const xlarge = `${src}?w=4000`;

  return (
    <img
      src={small}
      srcSet={`${small} 300w, ${medium} 768w, ${large} 1280w`}
      alt={alt}
      {...rest}
    />
  );
};

export default ResponsiveImage;
