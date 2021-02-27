import React from 'react';
import { Box } from '@chakra-ui/react';
import ServiceBox from './serviceBox';
import InfoFraStyret from './infoFraStyret';
import PrivateInfoList from './privateInfoList';
import SEO from '../seo';

export default function Main() {
  return (
    <>
      <SEO />
      <Box w='95vw' ml='0' pr={['0', '0', '5vw', '25vw']} pb={16}>
        <ServiceBox />
        <InfoFraStyret />
        <PrivateInfoList />
      </Box>
    </>
  );
}
