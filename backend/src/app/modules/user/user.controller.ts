import { Request, Response } from 'express'
import userServices from './user.service'
import catchAsync from '../../utils/catchAsync'
import { UserInterface } from './user.interface'
import { uploadToCloudinary } from '../../utils/cloudinary';
import { AuthenticatedRequest } from './user.middleware';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  if (req.file && req.file.buffer) {
    const photoUrl = await uploadToCloudinary(req.file);
    userData.userPhoto = photoUrl;
  }

  // console.log('Received user data:', userData);
  const newUser = await userServices.createUserService(userData);

  const userObject: UserInterface = newUser.toObject();
  const { password, ...result } = userObject;

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('Login attempt for email:', email);

  const { token, user } = await userServices.loginUserService(email, password);

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: user,
  });
});


const getMe = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  
  
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  const user = await userServices.getMeService(req.user.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});


const userControllers = {
  createUser,
  loginUser,
  getMe,
}

export default userControllers;
