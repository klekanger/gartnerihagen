/**
 * Send an email to all users that have enabled email alerts
 * Using the Sendgrid API
 */

import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
const ManagementClient = require('auth0').ManagementClient;
const sgMail = require('@sendgrid/mail');

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method !== `POST`) {
    return res.status(405).json({
      error: 'method not allowed',
      error_description: 'You should do a POST request to access this',
    });
  }

  // Check if secret key received from Contentful web hook matches the one in the .env file
  if (
    req.headers?.contentful_webhook_secret !==
    process.env.CONTENTFUL_WEBHOOK_SECRET
  ) {
    return res.status(401).json({
      error: 'unauthorized',
      error_description: 'The Contentful web hook secret key is not correct',
    });
  }

  // Connect to the Auth0 management API
  const auth0 = new ManagementClient({
    domain: `${process.env.GATSBY_AUTH0_DOMAIN}`,
    clientId: `${process.env.AUTH0_BACKEND_CLIENT_ID}`,
    clientSecret: `${process.env.AUTH0_BACKEND_CLIENT_SECRET}`,
    scope: 'read:users',
  });

  try {
    const users = await auth0.getUsers();

    // Filter out only those users that have subscribed to email alerts
    // This is defined in the user_metadata field on Auth0
    const userEmails = users
      .filter((user) => user?.user_metadata?.subscribeToEmails === true)
      .map((user) => user?.email);

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: userEmails,
      from: 'Boligsameiet Gartnerihagen <gartnerihagen@gmail.com>',
      templateId: 'd-93e1c9f601084a3bb35fbd024fd3e62a',
      dynamic_template_data: {
        articleURL: 'https://gartnerihagen-askim.no/informasjon',
      },
    };

    await sgMail.sendMultiple(msg);

    res.status(200).json({
      body: {
        status_code: 200,
        status_description: 'Emails are sent to all subscribed users',
        userEmails,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.name,
      status_code: error.statusCode || 500,
      error_description: error.message,
    });
  }
}
