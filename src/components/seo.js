import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
/* import { useLocation } from "@reach/router"; */
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ title, description }) => {
  /* const { pathname } = useLocation(); */
  const { site } = useStaticQuery(query);
  const {
    defaultDescription,
    defaultTitle,
    siteLanguage,
    banner,
    siteUrl,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
  };

  return (
    <Helmet
      htmlAttributes={{ siteLanguage }}
      title={seo.title}
      meta={[
        {
          name: "description",
          conten: seo.description,
        },
        {
          name: "image",
          content: `${siteUrl}${banner}`,
        },
        {
          property: "og:title",
          content: seo.title,
        },
        {
          property: "og:description",
          content: seo.description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: `${siteUrl}${banner}`,
        },
      ]}
    ></Helmet>
  );
};

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultDescription: description
        defaultTitle: title
        siteLanguage
        banner
        siteUrl
      }
    }
  }
`;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

SEO.defaultProps = {
  title: null,
  description: null,
};
