import { Schema, model } from 'mongoose';
import { ProfileInterface } from './profile.interface';

const ProfileSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      ref: 'User',
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: 'Gender must be either Male, Female, or Other.',
      },
    },
    userPhoto: { type: String },
    country: { type: String },
    contactNumber: { type: String },
    bio: { type: String, maxlength: [200, 'Bio must not exceed 200 characters.'] },
  },
  {
    timestamps: true,
  },
);

export default model<ProfileInterface>('Profile', ProfileSchema);
