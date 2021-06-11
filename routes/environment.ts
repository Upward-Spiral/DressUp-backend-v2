const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'nSNwEWHMsJwetjgfvxsJ4GHhw2gQc3XH',
  issuerBaseURL: 'https://dev-uy6268sw.eu.auth0.com',
  secret: 'LONG_RANDOM_STRING'
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});