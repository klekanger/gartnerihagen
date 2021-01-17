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
      allContentfulBlogPost {
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

    const blogNodes = (result.data.allContentfulBlogPost || {}).nodes || [];
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
    // Create blog post pages.
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
