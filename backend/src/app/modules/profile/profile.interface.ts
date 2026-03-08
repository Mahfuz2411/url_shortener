import { Document } from 'mongoose';

export interface ProfileInterface extends Document {
  email: string; // Reference to user email
  gender?: 'Male' | 'Female' | 'Other';
  userPhoto?: string;
  country?: string;
  contactNumber?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
