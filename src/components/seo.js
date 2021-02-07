import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';

const SEO = ({ title, description, image }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const {
    defaultDescription,
    defaultTitle,
    siteLanguage,
    defaultImage,
    siteUrl,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet
      htmlAttributes={{ siteLanguage }}
      title={seo.title}
      meta={[
        {
          name: 'description',
          content: seo.description,
        },
        {
          name: 'og:url',
          content: seo.url,
        },
        {
          name: 'image',
          content: seo.image,
        },
        {
          property: 'og:title',
          content: seo.title,
        },
        {
          property: 'og:description',
          content: seo.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: seo.image,
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
        defaultImage: banner
        siteUrl
      }
    }
  }
`;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

SEO.defaultProps = {
  title: 'Boligsameiet Gartnerihagen',
  description: 'Askims hyggeligste nabolag',
  image: null,
};
