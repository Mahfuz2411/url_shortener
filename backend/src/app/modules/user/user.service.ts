import { signToken } from '../../utils/jwt';
import userModel from './user.model'

const createUserService = async (userData: object) => {
  const newUser = await userModel.create(userData)
  return newUser
}

const loginUserService = async (
  email: string,
  password: string
) => {
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const isMatched = await user.isPasswordMatched(password);
  if (!isMatched) throw new Error("INVALID_CREDENTIALS");

  const token = signToken({
    userId: user._id,
    email: user.email,
    status: user.status
  });

  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      status: user.status,
      userPhoto: user?.userPhoto,
      country: user?.country,
      contactNumber: user?.contactNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  };
};

const userServices = {
  createUserService,
  loginUserService,
}

export default userServices;
