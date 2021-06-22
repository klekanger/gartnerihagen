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
  const small = `${src}?w=800&fm=webp 800w`;
  const medium = `${src}?w=1600&fm=webp 1600w`;
  const large = `${src}?w=1366&fm=webp 1366w`;

  return (
    <div>
      <picture>
        <source
          type='image/webp'
          sizes='(max-width: 1200px) 1200px, 100vw'
          src='//images.ctfassets.net/wxoemgzywng5/5r6WILLMKXX0qtACaRRVTm/ed394bffcfcc58531c8114b755de7d17/20210530_144100.jpg?w=1008&h=630&fl=progressive&q=50&fm=jpg'
          srcSet=`` 
        />
        <img
          src='//images.ctfassets.net/wxoemgzywng5/5r6WILLMKXX0qtACaRRVTm/ed394bffcfcc58531c8114b755de7d17/20210530_144100.jpg?w=1008&h=630&fl=progressive&q=50&fm=jpg'
          alt=''
          srcSet='
        //images.ctfassets.net/wxoemgzywng5/5r6WILLMKXX0qtACaRRVTm/ed394bffcfcc58531c8114b755de7d17/20210530_144100.jpg?w=1008&h=630&fl=progressive&q=50&fm=jpg  1008w,
        //images.ctfassets.net/wxoemgzywng5/5r6WILLMKXX0qtACaRRVTm/ed394bffcfcc58531c8114b755de7d17/20210530_144100.jpg?w=2016&h=1260&fl=progressive&q=50&fm=jpg 2016w,
        //images.ctfassets.net/wxoemgzywng5/5r6WILLMKXX0qtACaRRVTm/ed394bffcfcc58531c8114b755de7d17/20210530_144100.jpg?w=4000&h=2500&fl=progressive&q=50&fm=jpg 4000w
      '
          {...rest}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
