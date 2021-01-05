import * as React from "react";

import Layout from "../components/layouts/layout";
import SEO from "../components/seo";
import Hero from "../components/sections/hero";
import ArticleGrid from "../components/sections/articleGrid";

const IndexPage = () => {
  return (
    <Layout>
      <SEO />
      <Hero />
      <ArticleGrid />
    </Layout>
  );
};

export default IndexPage;
