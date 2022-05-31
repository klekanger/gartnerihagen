import { Box } from '@chakra-ui/react';
import * as React from 'react';
import SEO from '../seo';
import InfoFraStyret from './infoFraStyret';
import PrivateInfoList from './privateInfoList';
import ServiceBox from './serviceBox';
import Container from '../../components/layouts/container';

function InfoPage() {
  return (
    <>
      <SEO />
      <Container>
        <ServiceBox />
        <InfoFraStyret />
        <PrivateInfoList />
      </Container>
    </>
  );
}

export default InfoPage;
