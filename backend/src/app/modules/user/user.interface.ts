import { Document } from 'mongoose';

export interface UserInterface extends Document {
  fullName: string;
  email: string;
  password: string;
  
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
  
  status?: 'admin' | 'user' | 'pro-user' | 'blocked';
  createdAt?: Date;
  updatedAt?: Date;

  isPasswordMatched(plainPassword: string): Promise<boolean>;
}
