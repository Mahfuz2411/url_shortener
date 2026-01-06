import userModel from './user.model'

const createUserService = async (userData: object) => {
  const newUser = await userModel.create(userData)
  return newUser
}

const userServices = {
  createUserService,
}

export default userServices
