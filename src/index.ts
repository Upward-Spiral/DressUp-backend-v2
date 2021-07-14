import express from 'express'
import mongoose from 'mongoose'
const { auth } = require('express-openid-connect')
import { port, dbURI } from './config/environment'
import router from './config/router'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '0639ae9f3cf5f388ac4db9ca35f9e0bdb022c37ecbe01f1ee39d528ce66cc277',
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


    app.use(auth(config))

    //! Middleware
    app.use((req, res, next) => {
      console.log(`:rotating_light: Incoming request: ${req.method} - ${req.url}`)
      res.header('Access-Control-Allow-Origin', '*')
      // res.locals.user = req.oidc.user
      // res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH')
      // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      next()
    })

    app.get('/', (req, res) => {
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
      console.log('logged in')
    })

    //! Run the router
    app.use('/', router)

    //! Server
    app.listen(process.env.PORT || port, () => console.log(`:rocket: Express is up and running on port ${port}`))
  
  } catch (err) {
    console.log(':rotating_light: Something went wrong starting the app')
    console.log(err)
  }

}
startServer()

