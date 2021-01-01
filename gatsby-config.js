require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Boligsameiet Gartnerihagen",
  },

  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: "auon1l14rc7e",
      },
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
