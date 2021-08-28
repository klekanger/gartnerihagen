/**
 * Returns a list of users and roles for each user.
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
  let claims, permissions
  const token = getTokenFromHeader(req.headers.authorization);

  if (req.method !== `GET`) {
    return res.status(405).json({
      error: 'method not allowed',
      error_description: 'You should do a GET request to access this',
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

  // Get list of all roles and users in each role from Auth0 management API
  const auth0 = new ManagementClient({
    domain: `${process.env.GATSBY_AUTH0_DOMAIN}`,
    clientId: `${process.env.AUTH0_BACKEND_CLIENT_ID}`,
    clientSecret: `${process.env.AUTH0_BACKEND_CLIENT_SECRET}`,
    scope: 'read:users read:roles read:role_members',
  });

 
  try {
    const roles: string[] | undefined = await auth0.getRoles();
    const allUsersInRoles = await roles.map(async (role: any) => {
      const usersInRole = await auth0.getUsersInRole({ id: role.id });
      return { role: role.name, users: usersInRole };
    });

    const userRoles = await Promise.all(allUsersInRoles); // Get a list of all the roles and the users within each of them,
    const userList = await auth0.getUsers(); // and a list of every registered user

    // As Auth0 getUsers does not give us the user roles (they really should!), we have to build a new array
    // with all the users, and a new role field (which is an array with all roles)
    let userListWithRoles = [];
    userList.forEach((user) => {
      for (let i = 0; i < userRoles.length; i++) {
        // Check if current user exists in list of users with role [i]
        if (
          userRoles[i].users.find((element) => {
            return element.user_id === user.user_id;
          })
        ) {
          // If user exists in list of user role [i] (e.g. the user is "admin" or "editor")
          // push this user to the new userListWithRoles array, with the role appended
          // If the user has already been pushed to the new userListWithRoles array,
          // just update the roles.
          if (
            userListWithRoles.some((element) => {
              // true if user is already pushed to userListWithRoles
              return element.user_id === user.user_id;
            })
          ) {
            const existingUserToModify = userListWithRoles.find(
              (element) => element.user_id === user.user_id
            );

            existingUserToModify.roles = [
              ...existingUserToModify.roles, // Include all previously added roles
              userRoles[i].role, // ...and the new role
            ];
          } else {
            // The user has not previously been pushed to the userListWithRoles array.
            // Push the user we have found to the userListWithRoles array and append the user role we have found.
            userListWithRoles.push({
              ...user,
              roles: [userRoles[i].role],
            });
          }
        }
      }
    });

    res.status(200).json({
      body: {
        users: userListWithRoles,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      body: {
        error: error.name,
        status_code: error.statusCode || 500,
        error_description: error.message,
      },
    });
  }
}