/**
 * This serverless function adds or removes email subscriptions for a user.
 */

import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
const ManagementClient = require('auth0').ManagementClient;
const {
  JwtVerifier,
  JwtVerifierError,
  getTokenFromHeader,
} = require('@serverless-jwt/jwt-verifier');

const jwt = new JwtVerifier({
  issuer: `https://${process.env.GATSBY_AUTH0_DOMAIN}/`,
  audience: `https://${process.env.AUTH0_USERADMIN_AUDIENCE}`,
});

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  let claims, permissions;
  const token = getTokenFromHeader(req.headers.authorization);

  if (req.method !== `PATCH`) {
    return res.status(405).json({
      error: 'method not allowed',
      error_description: 'You should do a PATCH request to access this',
    });
  }

  // Verify access token
  try {
    claims = await jwt.verifyAccessToken(token);
    permissions = claims.permissions || [];
  } catch (err) {
    if (err instanceof JwtVerifierError) {
      return res.status(403).json({
        error: `Something went wrong. ${err.code}`,
        error_description: `${err.message}`,
      });
    }
  }

  // check if user should have access at all
  if (!claims || !claims.scope) {
    return res.status(403).json({
      error: 'access denied',
      error_description: 'Du har ikke tilgang til dette',
    });
  }

  if (!permissions.includes('update:users_app_metadata')) {
    return res.status(403).json({
      error: 'access denied',
      error_description: 'Du har ikke tilgang til dette',
    });
  }

  // Connect to the Auth0 management API
  const auth0 = new ManagementClient({
    domain: `${process.env.GATSBY_AUTH0_DOMAIN}`,
    clientId: `${process.env.AUTH0_BACKEND_CLIENT_ID}`,
    clientSecret: `${process.env.AUTH0_BACKEND_CLIENT_SECRET}`,
    scope: 'update:users_app_metadata',
  });

  const userData = {
    subscribeToEmails: req.body.user_metadata.subscribeToEmails,
  };

  try {
    const updatedUser = await auth0.updateUserMetadata(
      { id: req.body.user_id },
      userData
    );

    res.status(200).json({
      body: {
        status_code: 200,
        status_description: 'Epost-varsling endret',
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
      status_code: error.statusCode || 500,
      error_description: error.message,
    });
  }
}
