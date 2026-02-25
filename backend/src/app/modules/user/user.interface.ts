import { Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  password: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  userPhoto?: string;
  country?: string;
  contactNumber?: string;
  status?: 'admin' | 'user' | 'pro-user' | 'blocked';
  createdAt?: Date;
  updatedAt?: Date;

  isPasswordMatched(plainPassword: string): Promise<boolean>;
}
