// Deletes a user using Auth0's management API

import { Http2ServerResponse } from 'http2';
import { nextTick } from 'process';

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
  const token = getTokenFromHeader(req.headers.authorization);

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
      error_description: 'Du har ikke tilgang til dette',
    });
  }

  // Check the permissions
  // We'll just check for update:users, as a user that has this access level also
  // should be able to update the roles of users (create:role_members and read:roles scope).
  // No need to check that at this point.
  if (!permissions.includes('delete:users')) {
    return res.status(403).json({
      error: 'no delete access',
      status_code: res.statusCode,
      error_description:
        'Du må ha admin-tilgang for å slette brukere. Ta kontakt med styret.',
      body: {
        data: [],
      },
    });
  }

  // Connect to the Auth0 management API
  const auth0 = new ManagementClient({
    domain: `${process.env.AUTH0_BACKEND_DOMAIN}`,
    clientId: `${process.env.AUTH0_BACKEND_CLIENT_ID}`,
    clientSecret: `${process.env.AUTH0_BACKEND_CLIENT_SECRET}`,
    scope: 'delete:users',
  });

  try {
    const idToDelete = req?.body?.idToDelete;

    if (!idToDelete || !idToDelete.includes('auth0')) {
      const error = {
        name: 'bad user id',
        statusCode: 400,
        message: 'Manglende bruker-id eller feil format',
      };
      throw error;
    }

    await auth0.deleteUser({ id: idToDelete });

    return res.status(200).json({
      body: {
        status_code: 200,
        status_description: 'Bruker er slettet',
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      error: error.name,
      status_code: error.statusCode || 500,
      error_description: error.message,
    });
  }
}
