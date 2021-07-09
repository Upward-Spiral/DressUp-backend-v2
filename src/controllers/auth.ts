
import User, { IUser } from '../models/user'
import express from 'express'

export const registerUser = async (req: express.Request, res: express.Response) => {
  try {
    const newUser = await User.create(req.body)
    console.log('NEW USER >', newUser)
    return res.status(202).json({ message: `Welcome ${newUser.firstName}` })
  } catch (err) {
    console.log(err)
    return res.status(422).json({
      username: err._message,
      email: '',
      password: '',
      passwordConfirmation: ''
    })
  }
}