import * as React from "react";

import Layout from "../components/layouts/layout";
import SEO from "../components/seo";
import Hero from "../components/sections/hero";

const IndexPage = () => {
  return (
    <Layout>
      <SEO />
      <Hero />
    </Layout>
  );
};

export default IndexPage;
