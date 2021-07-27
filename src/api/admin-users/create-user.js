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
  // const mustHavePermissions = ['read:users'];

  let claims, permissions;
  const token = getTokenFromHeader(req.get('authorization'));

  // Verify access token
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

  console.log(req.body);

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
      status_code: res.statusCode,
      error_description:
        'Du må ha admin-tilgang for å administrere brukere. Ta kontakt med styret.',
      body: {
        data: [],
      },
    });
  }

  // Create a new user through the Auth0 management API
  const auth0 = new ManagementClient({
    domain: `${process.env.AUTH0_BACKEND_DOMAIN}`,
    clientId: `${process.env.AUTH0_BACKEND_CLIENT_ID}`,
    clientSecret: `${process.env.AUTH0_BACKEND_CLIENT_SECRET}`,
    scope: 'create:users',
  });

  // Success! Return a confirmation to the client
  return res.status(200).json({
    body: {
      status_code: 200,
      status_description: 'Ny bruker er opprettet',
    },
  });
}
