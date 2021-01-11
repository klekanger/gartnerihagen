const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            contentful_id
            createdAt
          }
        }
      }
    `,
    { limit: 1000 }
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const blogNodes = (result.data.allContentfulBlogPost || {}).nodes || [];

    // Create blog post pages.
    blogNodes.forEach((node) => {
      const id = node.contentful_id;
      console.log("ID = ", id);
      createPage({
        // Path for this page — required
        path: `/blog/${id}`,
        component: blogPostTemplate,
        context: { id },
      });
    });
  });
};
