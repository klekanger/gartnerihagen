import React, { useEffect, useState } from 'react';
import { Link as GatsbyLink } from 'gatsby';
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
  Text,
} from '@chakra-ui/react';

import SEO from '../components/seo';
import HeroWide from '../components/sections/hero-wide';
import ArticleGrid from '../components/sections/articleGrid';

const IndexPage = () => {
  const [hasSeenCookieBanner, setHasSeenCookieBanner] = useState(false);
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

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
    return (
      <Drawer
        placement='bottom'
        isOpen={hasSeenCookieBanner && isOpen}
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent textColor='light' bg='gray.700'>
            <DrawerHeader borderBottomWidth='1px'>
              Denne nettsiden brukes cookies
            </DrawerHeader>
            <DrawerBody>
              <Text color='light'>
                Vi bruker cookies (informasjonskapsler) for blant annet at du
                skal slippe å måtte logge deg inn på nytt. Ved å fortsette å
                surfe videre aksepterer du dette.{' '}
                <Link as={GatsbyLink} to='/cookies-og-personvern-gdpr'>
                  <strong>Les mer om cookies og personvern her.</strong>
                </Link>
              </Text>
            </DrawerBody>
            <DrawerFooter>
              <Button variant='menu-button' color='black' onClick={onClose}>
                Den er grei!
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  };

  return (
    <>
      <SEO />
      <ShowConsent />
      <HeroWide />
      <ArticleGrid />
    </>
  );
};

export default IndexPage;

// TODO
// Refactor cookie consent into its own component
