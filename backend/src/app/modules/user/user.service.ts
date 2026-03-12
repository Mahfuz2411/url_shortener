import { signToken } from '../../utils/jwt';
import userModel from './user.model';
import { EmailService } from '../../utils/emailService';
import crypto from 'crypto';
import Profile from '../profile/profile.model';

const createUserService = async (userData: { fullName: string; email: string; password: string }) => {
  // Check if user already exists
  const existingUser = await userModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const newUser = await userModel.create({
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password,
    status: 'user',
    isVerified: false,
    verificationToken,
    verificationTokenExpires,
  });

  // Create empty profile for the new user
  await Profile.create({ email: newUser.email });

  // Send verification email
  await EmailService.sendVerificationEmail(
    newUser.email,
    newUser.fullName,
    verificationToken
  );

  return {
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    isVerified: newUser.isVerified,
    createdAt: newUser.createdAt,
  };
};

const verifyEmailService = async (token: string) => {
  const user = await userModel.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  }).select('+verificationToken +verificationTokenExpires');

  if (!user) {
    // Check if token exists but expired
    const expiredUser = await userModel.findOne({
      verificationToken: token,
    }).select('+verificationToken +verificationTokenExpires email isVerified');
    
    if (expiredUser) {
      if (expiredUser.isVerified) {
        throw new Error('EMAIL_ALREADY_VERIFIED');
      }
      throw new Error('INVALID_OR_EXPIRED_TOKEN');
    }
    
    throw new Error('INVALID_OR_EXPIRED_TOKEN');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  return {
    message: 'Email verified successfully',
    email: user.email,
  };
};

const loginUserService = async (email: string, password: string) => {
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) throw new Error('INVALID_CREDENTIALS');

  const isMatched = await user.isPasswordMatched(password);
  if (!isMatched) throw new Error('INVALID_CREDENTIALS');

  // Check if email is verified
  if (!user.isVerified) {
    throw new Error('EMAIL_NOT_VERIFIED');
  }

  const token = signToken({
    userId: user._id,
    email: user.email,
    status: user.status,
  });

  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      status: user.status,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};

const resendVerificationEmailService = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error('USER_NOT_FOUND');

  if (user.isVerified) {
    throw new Error('EMAIL_ALREADY_VERIFIED');
  }

  // Generate new verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  user.verificationToken = verificationToken;
  user.verificationTokenExpires = verificationTokenExpires;
  await user.save();

  // Send verification email
  await EmailService.sendVerificationEmail(user.email, user.fullName, verificationToken);

  return { message: 'Verification email sent successfully' };
};

const requestPasswordResetService = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    // Don't reveal if email exists or not
    return { message: 'If the email exists, a password reset link has been sent' };
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  user.passwordResetToken = resetToken;
  user.passwordResetTokenExpires = resetTokenExpires;
  await user.save();

  // Send reset email
  await EmailService.sendPasswordResetEmail(user.email, user.fullName, resetToken);

  return { message: 'If the email exists, a password reset link has been sent' };
};

const resetPasswordService = async (token: string, newPassword: string) => {
  const user = await userModel.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  }).select('+passwordResetToken +passwordResetTokenExpires');

  if (!user) {
    throw new Error('INVALID_OR_EXPIRED_TOKEN');
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  return { message: 'Password reset successfully' };
};

const getMeService = async (userId: string) => {
  const user = await userModel.findById(userId).select('-password');
  if (!user) throw new Error('USER_NOT_FOUND');

  // Auto-downgrade expired pro subscriptions
  if (user.status === 'pro-user' && user.proExpiresAt && user.proExpiresAt < new Date()) {
    user.status = 'user';
    user.proExpiresAt = undefined;
    await user.save();
  }

  return user.toObject();
};

const userServices = {
  createUserService,
  verifyEmailService,
  loginUserService,
  resendVerificationEmailService,
  requestPasswordResetService,
  resetPasswordService,
  getMeService,
};

export default userServices;
