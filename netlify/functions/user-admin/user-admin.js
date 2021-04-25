exports.handler = async (event, context) => {
  // Connect to Auth0 Management API

  console.log('event: ', event);
  console.log('context: ', context);

  const ManagementClient = require('auth0').ManagementClient;
  const auth0 = new ManagementClient({
    domain: `${process.env.AUTH0_BACKEND_DOMAIN}`,
    clientId: `${process.env.AUTH0_BACKEND_CLIENT_ID}`,
    clientSecret: `${process.env.AUTH0_BACKEND_CLIENT_SECRET}`,
    scope: 'read:users update:users',
  });

  // Get all users from Auth0 Management API
  let userList;
  try {
    userList = await auth0.getUsers();
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: userList,
    }),
  };
};

// Netlify Functions Playground
//
// https://functions.netlify.com/playground/

// https://auth0.com/blog/build-an-admin-dashboard-with-express-and-vue-adding-user-authorization/