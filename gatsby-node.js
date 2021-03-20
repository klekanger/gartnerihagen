const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blog-template.tsx`);
  const pageTemplate = path.resolve(`src/templates/page-template.tsx`);
  const blogArchiveTemplate = path.resolve(
    `./src/templates/blog-archive-template.tsx`
  );

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

    // Create blog archive pages
    const postsPerPage = 4;
    const numPages = Math.ceil(blogNodes.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: blogArchiveTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
};
