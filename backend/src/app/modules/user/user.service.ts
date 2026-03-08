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

  console.log('Creating user with email:', userData.email);
  console.log('Generated verification token:', verificationToken);
  console.log('Token expiry:', verificationTokenExpires);

  const newUser = await userModel.create({
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password,
    status: 'user',
    isVerified: false,
    verificationToken,
    verificationTokenExpires,
  });

  console.log('User created with ID:', newUser._id);
  console.log('Token saved to user:', newUser.verificationToken ? 'Yes (hidden by select: false)' : 'No');

  // Verify the token was saved
  const savedUser = await userModel.findById(newUser._id).select('+verificationToken +verificationTokenExpires');
  console.log('Verification: Token in DB:', savedUser?.verificationToken);
  console.log('Verification: Expiry in DB:', savedUser?.verificationTokenExpires);

  // Create empty profile for the new user
  await Profile.create({ email: newUser.email });
  console.log('Empty profile created for:', newUser.email);

  // Send verification email
  await EmailService.sendVerificationEmail(
    newUser.email,
    newUser.fullName,
    verificationToken
  );

  console.log('Verification email sent to:', newUser.email);

  return {
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    isVerified: newUser.isVerified,
    createdAt: newUser.createdAt,
  };
};

const verifyEmailService = async (token: string) => {
  console.log('Verifying email with token:', token);
  console.log('Current time:', new Date());
  
  // First, let's check if any user has this exact token (regardless of expiry)
  const allUsersWithToken = await userModel.find({
    verificationToken: token,
  }).select('+verificationToken +verificationTokenExpires email isVerified');
  
  console.log('All users with this token:', allUsersWithToken.length);
  if (allUsersWithToken.length > 0) {
    allUsersWithToken.forEach(u => {
      console.log(`User: ${u.email}, Verified: ${u.isVerified}, Token: ${u.verificationToken?.substring(0, 10)}..., Expiry: ${u.verificationTokenExpires}`);
    });
  }
  
  const user = await userModel.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  }).select('+verificationToken +verificationTokenExpires');

  console.log('User found (with valid expiry):', user ? 'Yes' : 'No');
  
  if (user) {
    console.log('Token expiry:', user.verificationTokenExpires);
    console.log('Is expired?', user.verificationTokenExpires ? new Date(user.verificationTokenExpires) < new Date() : 'No expiry date');
  }

  if (!user) {
    // Check if token exists but expired
    const expiredUser = await userModel.findOne({
      verificationToken: token,
    }).select('+verificationToken +verificationTokenExpires email isVerified');
    
    if (expiredUser) {
      console.log('Token found but expired. Email:', expiredUser.email);
      console.log('Already verified?', expiredUser.isVerified);
      console.log('Expiry was:', expiredUser.verificationTokenExpires);
      
      if (expiredUser.isVerified) {
        throw new Error('EMAIL_ALREADY_VERIFIED');
      }
      throw new Error('INVALID_OR_EXPIRED_TOKEN');
    }
    
    console.log('Token not found in database');
    
    // Check if there's a user with this email who is already verified (common case when link is clicked twice)
    // We need to check recent users
    const recentlyVerifiedUser = await userModel.findOne({
      isVerified: true,
      // Check if created within last 10 minutes
      createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) }
    }).select('email isVerified');
    
    if (recentlyVerifiedUser) {
      console.log('Recently verified user found:', recentlyVerifiedUser.email);
      console.log('This is likely a duplicate verification attempt');
      throw new Error('EMAIL_ALREADY_VERIFIED');
    }
    
    // Debug: Show all users with tokens
    const allUsers = await userModel.find({}).select('+verificationToken email isVerified');
    console.log('Total users in DB:', allUsers.length);
    console.log('Users with tokens:', allUsers.filter(u => u.verificationToken).length);
    
    throw new Error('INVALID_OR_EXPIRED_TOKEN');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  console.log('Email verified successfully for:', user.email);

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
  const user = await userModel.findById(userId).select('-password').lean();
  if (!user) throw new Error('USER_NOT_FOUND');
  return user;
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
