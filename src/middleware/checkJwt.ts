const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');
const config = require('config');
const _ = require('lodash');

const { audience, auth0Domain } = config.auth;

export const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience,
  issuer: `https://${auth0Domain}/`,
  algorithms: ['RS256']
});
