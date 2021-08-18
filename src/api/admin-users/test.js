// Just a test file to debug Gatsby functions on Netlify
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

  // check if user should have access at all
  if (!claims || !claims?.scope) {
    return res.status(403).json({
      error: 'access denied',
      error_description: 'You do not have access to this',
    });
  }

  // Check the permissions
  if (!permissions.includes('read:roles')) {
    return res.status(403).json({
      error: 'no read access',
      status_code: res.statusCode,
      error_description:
        'Du må ha admin-tilgang for å administrere brukere. Ta kontakt med styret.',
      body: {
        data: [],
      },
    });
  }

  res.status(200).json({ hello: `world` });
}
