const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blog-template.js`);
  const pageTemplate = path.resolve(`src/templates/page-template.js`);

  return graphql(`
    {
      allContentfulSide {
        nodes {
          contentful_id
          slug
        }
      }
      publicPosts: allContentfulBlogPost(
        filter: { privatePost: { eq: false } }
      ) {
        nodes {
          contentful_id
          slug
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const blogNodes = (result.data.publicPosts || {}).nodes || [];
    const pageNodes = (result.data.allContentfulSide || {}).nodes || [];

    // Create pages.
    pageNodes.forEach((node) => {
      const id = node.contentful_id;
      const slug = node.slug;
      createPage({
        // Path for this page — required
        path: `${slug}`,
        component: pageTemplate,
        context: { id },
      });
    });

    // Create public blog post pages.
    // Skip private pages (in graphQl query)
    blogNodes.forEach((node) => {
      const id = node.contentful_id;
      const slug = node.slug;
      createPage({
        // Path for this page — required
        path: `/blog/${slug}`,
        component: blogPostTemplate,
        context: { id },
      });
    });
  });
};
