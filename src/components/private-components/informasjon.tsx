import * as React from 'react';
import { Box } from '@chakra-ui/react';
import ServiceBox from './serviceBox';
import InfoFraStyret from './infoFraStyret';
import PrivateInfoList from './privateInfoList';
import GetDocs from './apollo-test-getdocs';
import SEO from '../seo';

function InfoPage() {
  return (
    <>
      <SEO />
      <Box maxWidth={['97%', '95%', '95%', '60%']} pt={4}>
        <ServiceBox />
        <InfoFraStyret />
        <GetDocs />
      </Box>
    </>
  );
}

export default InfoPage;
