require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Boligsameiet Gartnerihagen',
    description: 'Askims hyggeligste nabolag.',
    siteUrl: 'https://www.gartnerihagen-askim.no',
    siteLanguage: 'nb-no',
    banner:
      'https://images.ctfassets.net/wxoemgzywng5/48qgvJRlnlJcR6SibfnEt0/3934c143437413911ad162fc49ac1056/kveldssteming.jpg?w=1080',
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        downloadLocal: true,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/informasjon/*`, `/min-side/*`, `/preview/*`] },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Boligsameiet Gartnerihagen `,
        short_name: `Gartnerihagen`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/gartnerihagen-logo.svg`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },

    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: 'https://d9c8f736d473490dbe0f40656ff8a26b@o849093.ingest.sentry.io/5815978',
        sampleRate: 0.7,
      },
    },
  ],
};
