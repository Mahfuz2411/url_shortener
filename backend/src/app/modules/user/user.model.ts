import { Schema, model } from 'mongoose';
import { UserInterface } from './user.interface';

import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      minlength: [3, 'Name must be at least 3 characters long.'],
      maxlength: [50, 'Name must not exceed 50 characters.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: 'Gender must be either Male, Female, or Other.',
      },
      required: [true, 'Gender is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Invalid email format.',
      },
    },
    userPhoto: { type: String },
    country: { type: String },
    contactNumber: { type: String },
    status: {
      type: String,
      enum: ['admin', 'user', 'pro-user', 'blocked'],
    },
  },
  {
    timestamps: true,
  },
);


UserSchema.pre<UserInterface>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password as string, 10);
  next();
});

UserSchema.methods.isPasswordMatched = async function (
  plainPassword: string
) {
  return bcrypt.compare(plainPassword, this.password);
};

export default model<UserInterface>('User', UserSchema);
