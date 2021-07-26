const ManagementClient = require('auth0').ManagementClient;
const {
  JwtVerifier,
  JwtVerifierError,
  getTokenFromHeader,
} = require('@serverless-jwt/jwt-verifier');

const jwt = new JwtVerifier({
  issuer: `https://${process.env.AUTH0_BACKEND_DOMAIN}/`,
  audience: `https://${process.env.AUTH0_USERADMIN_AUDIENCE}`,
});

export default async function handler(req, res) {
  // Verifiser token mottatt fra frontend
  // const mustHavePermissions = ['create:users'];

  let claims, permissions;
  const token = getTokenFromHeader(req.get('authorization'));

  // Verify access token received from frontend
  try {
    claims = await jwt.verifyAccessToken(token);
    permissions = claims?.permissions ?? [];
  } catch (err) {
    if (err instanceof JwtVerifierError) {
      return res.status(403).json({
        error: `Something went wrong. ${err?.code}`,
        error_description: `${err.message}`,
      });
    }
  }

  // check if user should have access at all
  if (!claims || !claims?.scope) {
    return res.status(403).json({
      error: 'access denied',
      error_description: 'You do not have access to this',
    });
  }

  // Check the permissions
  if (!permissions.includes('create:users')) {
    return res.status(403).json({
      error: 'no create access',
      error_code: res.statusCode,
      error_description:
        'Du må ha admin-tilgang for å opprette brukere. Ta kontakt med styret.',
      body: {
        data: [],
      },
    });
  }

  // Get list of all users from Auth0 management API
  const auth0 = new ManagementClient({
    domain: `${process.env.AUTH0_BACKEND_DOMAIN}`,
    clientId: `${process.env.AUTH0_BACKEND_CLIENT_ID}`,
    clientSecret: `${process.env.AUTH0_BACKEND_CLIENT_SECRET}`,
    scope: 'read:users update:users delete:users create:users',
  });

  /*
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

  */
  // Success! Return a list of all users to client
  return res.status(200).json({
    body: {
      statusCode: 200,
      data: 'created user',
    },
  });
}

// TODO
// Separate user admin into several serverless functions:
// create-user.js, delete-user.js, update-user.js, change-admin-status.js
// Check for the appropriete permissions in each of these serverless functions.
