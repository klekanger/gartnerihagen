const ManagementClient = require('auth0').ManagementClient;

export default async function handler(req, res) {
  const auth0 = new ManagementClient({
    domain: `${process.env.AUTH0_BACKEND_DOMAIN}`,
    clientId: `${process.env.AUTH0_BACKEND_CLIENT_ID}`,
    clientSecret: `${process.env.AUTH0_BACKEND_CLIENT_SECRET}`,
    scope: 'read:users update:users delete:users create:users',
  });

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

  res.json({
    statusCode: 200,
    body: JSON.stringify({
      data: userList,
    }),
  });
}
