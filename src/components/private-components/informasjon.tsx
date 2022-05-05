import { Box } from '@chakra-ui/react';
import * as React from 'react';
import SEO from '../seo';
import InfoFraStyret from './infoFraStyret';
import PrivateInfoList from './privateInfoList';
import ServiceBox from './serviceBox';

function InfoPage() {
  return (
    <>
      <SEO />
      <Box maxWidth={['97%', '95%', '95%', '70%']} pt={4} m='auto'>
        <ServiceBox />
        <InfoFraStyret />
        <PrivateInfoList />
      </Box>
    </>
  );
}

export default InfoPage;
