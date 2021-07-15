import express from 'express'
import Item from '../models/item'
import Outfit from '../models/outfit'

const router = express.Router()

const { auth, requiresAuth } = require('express-openid-connect')
const app = express()

app.use(
  auth({
    authRequired: false
  })
)

// Anyone can access the homepage
app.get('/home', (_req, res) => {
  res.send('<a href="/home">Home</a>')
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

app.get('/item/list', requiresAuth(), (_req, res) => {
  const eachItem = Item.find()
  return res.status(200).json(eachItem)
})

app.get('item/detail/:id', requiresAuth(), (req, res) => {
  const { id } = req.params
  const oneItem = Item.findById(id)
  if (!oneItem) throw new Error()
  return res.status(200).json(oneItem)
})

app.get('/outfit/list', requiresAuth(), (_req, res) => {
  const eachOutfit = Outfit.find()
  return res.status(200).json(eachOutfit)
})

app.get('outfit/detail/:id', requiresAuth(), (req, res) => {
  const { id } = req.params
  const oneOutfit = Outfit.findById(id)
  if (!oneOutfit) throw new Error()
  return res.status(200).json(oneOutfit)
})



export default router