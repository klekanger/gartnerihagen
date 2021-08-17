// This serverless function both updates the email and name of the user
// and adds or removes one or more of the ALLOWED_ROLES

const ManagementClient = require('auth0').ManagementClient;
const {
  JwtVerifier,
  JwtVerifierError,
  getTokenFromHeader,
} = require('@serverless-jwt/jwt-verifier');

const ALLOWED_ROLES = ['user', 'admin', 'editor'];

const jwt = new JwtVerifier({
  issuer: `https://${process.env.AUTH0_BACKEND_DOMAIN}/`,
  audience: `https://${process.env.AUTH0_USERADMIN_AUDIENCE}`,
});

export default async function handler(req, res) {
  let claims, permissions;
  const token = getTokenFromHeader(req.get('authorization'));

  const userRoles = req.body.roles;

  userRoles.forEach((role) => {
    if (!ALLOWED_ROLES.includes(role)) {
      console.log('role not allowed');
      return res.status(400).json({ body: 'midlertidig stopp' });
    }
  });

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
  if (!permissions.includes('update:users')) {
    return res.status(403).json({
      error: 'no update access',
      status_code: res.statusCode,
      error_description:
        'Du må ha admin-tilgang for å oppdatere brukere. Ta kontakt med styret.',
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
    scope: 'update:users read:roles create:role_members',
  });

  const userData = {
    connection: 'Username-Password-Authentication',
    email: req.body.email,
    name: req.body.name,
  };

  try {
    const updatedUser = await auth0.updateUser(
      { id: req.body.user_id },
      userData
    );
    const allRoles = await auth0.getRoles();

    let rolesToRemove = [];
    allRoles.forEach((role) => {
      if (!userRoles.includes(role.name)) {
        rolesToRemove.push(role.id);
      }
    });

    let rolesToAdd = [];
    allRoles.forEach((role) => {
      if (userRoles.includes(role.name)) {
        rolesToAdd.push(role.id);
      }
    });

    if (rolesToAdd.length > 0) {
      await auth0.assignRolestoUser(
        {
          id: req.body.user_id,
        },
        {
          roles: rolesToAdd,
        }
      );
    }

    if (rolesToRemove.length > 0) {
      await auth0.removeRolesFromUser(
        {
          id: req.body.user_id,
        },
        {
          roles: rolesToRemove,
        }
      );
    }

    return res.status(200).json({
      body: {
        status_code: 200,
        status_description: 'Bruker er oppdatert',
        user: updatedUser,
        roles_removed: rolesToRemove,
        roles_added: rolesToAdd,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode).json({
      error: error.name,
      status_code: error.statusCode || 500,
      error_description: error.message,
    });
  }
}
