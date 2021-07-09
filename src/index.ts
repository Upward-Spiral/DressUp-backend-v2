import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI, secret } from './config/environment'
import dotenv from 'dotenv'
dotenv.config()
const { auth } = require('express-openid-connect')

const app = express()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: secret,
  baseURL: 'https://localhost:3000',
  clientID: 'LwYZNrkiCHK0rpnbDdvFWcepAdNFYqvh',
  issuerBaseURL: 'https://dev-puad4y88.eu.auth0.com'
}

const startServer = async () => {

  try {

    //! Connect to mongo
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log(':rocket: Database has connected successfully')

    mongoose.connection.on('connected', () => {
      console.log('Mongoose is connected')
    })

    //! Body parser
    app.use(express.json())

    //! Middleware
    app.use((req, res, next) => {
      console.log(`:rotating_light: Incoming request: ${req.method} - ${req.url}`)
      res.header('Access-Control-Allow-Origin', '*')
      // res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH')
      // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      next()
    })


    
    //! auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(auth(config))
    
    //! req.isAuthenticated is provided from the auth router
    app.get('/', (req, res) => {
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
    })

    //! Run the router
    // app.use('/', router)

    //! Server
    app.listen(process.env.PORT || port, () => console.log(`:rocket: Express is up and running on port ${port}`))
  
  } catch (err) {
    console.log(':rotating_light: Something went wrong starting the app')
    console.log(err)
  }

}
startServer()

