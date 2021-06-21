import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import jwtAuthz from 'express-jwt-authz'

import * as dotenv from 'dotenv'

dotenv.config()

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

export const checkScopes = jwtAuthz([ 'post:items', 'edit:items', 'delete:items' ])