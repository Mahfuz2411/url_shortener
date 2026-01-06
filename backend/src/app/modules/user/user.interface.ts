export interface UserInterface {
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
}
