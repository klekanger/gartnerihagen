import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';

interface ISEOProps {
  title?: string | null;
  description?: string;
  lang?: string;
  meta?: Array<{ name: string; content: string }>;
  image?: string | null;
}

interface IQueryDataTypes {
  site: {
    siteMetadata: {
      defaultDescription: string;
      defaultTitle: string;
      siteLanguage: string;
      defaultImage: string;
      siteUrl: string;
    };
  };
}

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
  !image ? (seoImage = `${siteUrl}${defaultImage}`) : (seoImage = image);

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
