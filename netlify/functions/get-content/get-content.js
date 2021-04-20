exports.handler = async function (event) {
  var ManagementClient = require('auth0').ManagementClient;
  var auth0 = new ManagementClient({
    domain: '{YOUR_ACCOUNT}.auth0.com',
    clientId: '{YOUR_NON_INTERACTIVE_CLIENT_ID}',
    clientSecret: '{YOUR_NON_INTERACTIVE_CLIENT_SECRET}',
    scope: 'read:users update:users',
  });

  return {
    statusCode: 200,
    body: 'This is returned from the get-contents serverless function.',
  };
};

/*
exports.handler = async function (event) {
  // Query params
  // `?hi=5` -> { hi: 5 }
  console.log('QueryStringParameters:', event.queryStringParameters);
  // HTTP method (GET, POST, etc)
  console.log('httpMethod:', event.httpMethod);
  // Request body (for non-GET requests)
  // In object form, no need to JSON.parse
  console.log('event.body:', event.body);
  // Headers
  // Includes cookie, referer, origin, and all the typical
  // stuff you'd expect.
  console.log('event.headers', event.headers);

  return {
    statusCode: 200,
    body: 'This is returned from the get-contents serverless function.',
  };
};

*/
