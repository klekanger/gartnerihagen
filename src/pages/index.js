import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  Link,
} from '@chakra-ui/react';

import Layout from '../components/layouts/layout';
import SEO from '../components/seo';
import HeroWide from '../components/sections/hero-wide';
import ArticleGrid from '../components/sections/articleGrid';

const IndexPage = () => {
  const [hasSeenCookieBanner, setHasSeenCookieBanner] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  // Set GDPR consent cookie (if it does not excist)
  const setGDPRCookieOnce = () => {
    if (
      !document.cookie
        .split('; ')
        .find((row) => row.startsWith('gartnerihagen_gdpr'))
    ) {
      setHasSeenCookieBanner(true);
      document.cookie = 'gartnerihagen_gdpr=true; max-age=31536000';
    }
  };

  useEffect(() => {
    setGDPRCookieOnce();
  }, []);

  const ShowConsent = () => {
    console.log('ShowConsent');
    return (
      <Drawer
        placement='bottom'
        isOpen={hasSeenCookieBanner && isOpen}
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent textColor='light'>
            <DrawerHeader borderBottomWidth='1px'>
              Denne nettsiden brukes cookies
            </DrawerHeader>
            <DrawerBody>
              <p>
                Vi bruker cookies (informasjonskapsler) for blant annet at du
                skal slippe å måtte logge deg inn på nytt. Ved å fortsette å
                surfe videre aksepterer du dette.{' '}
              </p>
              <p>Les mer om cookies og personvern her.</p>
            </DrawerBody>
            <DrawerFooter>
              <Button variant='standard' onClick={onClose}>
                Den er grei!
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  };

  return (
    <Layout>
      <SEO />
      <ShowConsent />
      <HeroWide />
      <ArticleGrid />
    </Layout>
  );
};

export default IndexPage;
