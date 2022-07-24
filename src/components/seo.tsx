import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import type { IQueryDataTypes, ISEOProps } from '../types/interfaces';

export default function SEO({
  title = 'Boligsameiet Gartnerihagen',
  description = 'Askims hyggeligste nabolag',
  image = null,
}: ISEOProps) {
  const { pathname }: { pathname: string } = useLocation();
  const { site }: IQueryDataTypes = useStaticQuery(query);

  const {
    defaultDescription,
    defaultTitle,
    siteLanguage,
    defaultImage,
    siteUrl,
  } = site.siteMetadata;

  let seoImage: string | object;

  // Check if SEO image is passed in as props
  // If not, use the default static image defined in gatsby-config.js
  // Also check that the image URL has https:// or http://
  if (image) {
    if (image.indexOf('https://') == 0 || image.indexOf('http://') == 0) {
      seoImage = `${image}?w=1080`;
    } else {
      seoImage = `https:${image}?w=1080`;
    }
  } else {
    seoImage = defaultImage;
  }

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${seoImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet
      htmlAttributes={{ lang: siteLanguage }}
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
}

const query: void = graphql`
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
