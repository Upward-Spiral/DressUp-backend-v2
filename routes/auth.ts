const { itemsRouter, authorizationFunction } = require('express-openid-connect')


itemsRouter.post(
  '/',
  authorizationFunction,
  async (req: Request, res: Response) => {
    res.send(req.oidc.isAuthenticated())
  }
)


// Public API endpoints

itemsRouter.get()

// Protected API endpoints
itemsRouter.use(authorizationFunction)

itemsRouter.post()
itemsRouter.put()
itemsRouter.delete()