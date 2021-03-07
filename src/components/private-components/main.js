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
      <Box maxWidth={['97%', '95%', '95%', '70%']} pt={4}>
        <ServiceBox />
        <InfoFraStyret />
        <PrivateInfoList />
      </Box>
    </>
  );
}
