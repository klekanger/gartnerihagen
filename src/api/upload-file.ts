/**
 * Uploads a file to Contentful
 *
 */
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
const ManagementClient = require('auth0').ManagementClient;
const {
  JwtVerifier,
  JwtVerifierError,
  getTokenFromHeader,
} = require('@serverless-jwt/jwt-verifier');

const ALLOWED_ROLES = ['user', 'admin', 'editor'];

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
  const userRoles = req.body.roles || ['user'];

  if (req.method !== `POST`) {
    return res.status(405).json({
      error: 'method not allowed',
      error_description: 'You should do a POST request to upload files',
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
  if (!permissions.includes('update:files')) {
    return res.status(403).json({
      error: 'no file update access',
      status_code: res.statusCode,
      error_description:
        'Du har ikke rettigheter til å laste opp eller endre filer. Ta kontakt med styret.',
      body: {
        data: [],
      },
    });
  }

  // Upload file to Contentful

  // ... needs some code here...
  // https://www.contentful.com/developers/docs/references/content-management-api/

  try {
    res.status(200).json({
      body: {
        status_code: 200,
        status_description: 'Fil lastet opp',
      },
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({
        error: error.name,
        message: error.message,
        status_code: error.statusCode || 500,
        error_description: 'Noe gikk galt',
      });
    }
    res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
      status_code: error.statusCode || 500,
      error_description: error.message,
    });
  }
}

/*

const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: '<content_management_api_key>'
})

client.getSpace('<space_id>')
.then((space) => space.getEnvironment('<environment_id>'))
.then((environment) => environment.getEntry('<entry_id>'))
.then((entry) => console.log(entry))
.catch(console.error)

*/
