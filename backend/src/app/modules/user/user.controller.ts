import { Request, Response } from 'express';
import userServices from './user.service';
import catchAsync from '../../utils/catchAsync';
import { AuthenticatedRequest } from '../../middlewares/authenticatedRequest';
import config from '../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const newUser = await userServices.createUserService(userData);

  res.status(201).json({
    success: true,
    message: 'User created successfully. Please check your email to verify your account.',
    data: newUser,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.query;

  console.log('Verify email endpoint called');
  console.log('Token received:', token);
  console.log('Token type:', typeof token);

  if (!token || typeof token !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Verification token is required',
    });
  }

  const result = await userServices.verifyEmailService(token);

  res.status(200).json({
    success: true,
    message: result.message,
    data: { email: result.email },
  });
});

const resendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await userServices.resendVerificationEmailService(email);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { token, user } = await userServices.loginUserService(email, password);

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: config.node_env === 'production',
    sameSite: config.node_env === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: user,
  });
});

const requestPasswordReset = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await userServices.requestPasswordResetService(email);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const result = await userServices.resetPasswordService(token, newPassword);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: config.node_env === 'production',
    sameSite: config.node_env === 'production' ? 'none' : 'lax',
  });

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

const getMe = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  const user = await userServices.getMeService(req.user.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    data: user,
  });
});

const userControllers = {
  createUser,
  verifyEmail,
  resendVerificationEmail,
  loginUser,
  requestPasswordReset,
  resetPassword,
  logoutUser,
  getMe,
};

export default userControllers;
