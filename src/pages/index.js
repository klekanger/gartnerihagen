import React from 'react';
import SEO from '../components/seo';
import CookieConsent from '../components/cookieConsent';
import HeroWide from '../components/sections/hero-wide';
import ArticleGrid from '../components/sections/articleGrid';

const IndexPage = () => {
  return (
    <>
      <SEO />
      <CookieConsent />
      <HeroWide />
      <ArticleGrid />
    </>
  );
};

export default IndexPage;
