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
  const token = getTokenFromHeader(req.headers.authorization);
  const userRoles = req.body.roles;

  if (req.method !== `POST`) {
    return res.status(405).json({
      error: 'method not allowed',
      error_description: 'You should do a POST request to access this',
    });
  }

  userRoles.forEach((role) => {
    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(403).json({
        error: 'invalid user role',
        error_description: 'Serveren mottok en ugyldig brukerrolle',
      });
    }
  });

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
      error_description: 'You do not have access to this',
    });
  }

  // Check the permissions
  if (!permissions.includes('create:users')) {
    return res.status(403).json({
      error: 'no create access',
      status_code: res.statusCode,
      error_description:
        'Du må ha admin-tilgang for å opprette brukere. Ta kontakt med styret.',
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
    scope: 'create:users read:roles create:role_members',
  });

  const userData = {
    connection: 'Username-Password-Authentication',
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    verify_email: false,
    email_verified: false,
  };

  try {
    const newUser = await auth0.createUser(userData);

    const allRoles = await auth0.getRoles();
    let rolesToAdd = [];
    allRoles.forEach((role) => {
      if (userRoles.includes(role.name)) {
        rolesToAdd.push(role.id);
      }
    });
    await auth0.assignRolestoUser(
      {
        id: newUser.user_id,
      },
      {
        roles: rolesToAdd,
      }
    );

    res.status(200).json({
      body: {
        status_code: 200,
        status_description: 'Ny bruker er opprettet',
        user: { ...newUser, roles: userRoles },
      },
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: error.name,
      status_code: error.statusCode || 500,
      error_description: error.message,
    });
  }
}
