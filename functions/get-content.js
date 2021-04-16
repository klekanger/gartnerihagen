exports.handler = async function (event) {
  // Query params
  // `?hi=5` -> { hi: 5 }
  console.log(event.queryStringParameters);
  // HTTP method (GET, POST, etc)
  console.log(event.httpMethod);
  // Request body (for non-GET requests)
  // In object form, no need to JSON.parse
  console.log(event.body);
  // Headers
  // Includes cookie, referer, origin, and all the typical
  // stuff you'd expect.
  console.log(event.headers);

  return {
    statusCode: 200,
    body: 'This is returned from the get-contents serverless function.',
  };
};
