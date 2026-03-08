import { Schema, model } from 'mongoose';
import { UserInterface } from './user.interface';
import config from '../../config';

import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      minlength: [3, 'Full name must be at least 3 characters long.'],
      maxlength: [50, 'Full name must not exceed 50 characters.'],
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
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    verificationTokenExpires: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetTokenExpires: {
      type: Date,
      select: false,
    },
    status: {
      type: String,
      enum: ['admin', 'user', 'pro-user', 'blocked'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);


UserSchema.pre<UserInterface>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password as string, config.salt_rounds);
  next();
});

UserSchema.methods.isPasswordMatched = async function (
  plainPassword: string
) {
  return bcrypt.compare(plainPassword, this.password);
};

export default model<UserInterface>('User', UserSchema);
