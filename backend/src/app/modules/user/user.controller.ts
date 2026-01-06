import { Request, Response } from 'express'
import userServices from './user.service'
import catchAsync from '../../utils/catchAsync'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body

  const newUser = await userServices.createUserService(userData)

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser,
  })
})

const userControllers = {
  createUser,
}

export default userControllers
