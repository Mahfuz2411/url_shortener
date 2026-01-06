import { Schema, model } from 'mongoose';
import { UserInterface } from './user.interface';

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
      validate: {
        validator: function (v: string) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v,
          );
        },
        message:
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },
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

// Export the model
export default model<UserInterface>('User', UserSchema);
