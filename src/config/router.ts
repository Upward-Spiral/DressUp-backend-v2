import express from 'express'
const router = express.Router()

const { auth, requiresAuth } = require('express-openid-connect');
const app = express()

app.use(
  auth({
    authRequired: false
  })
)

// Anyone can access the homepage
app.get('/', (_req, res) => {
  res.send('<a href="/home">Home</a>')
})

app.get('/profile', requiresAuth(), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, welcome back.`)
)


export default router