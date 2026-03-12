import { Response } from 'express';
import { ProfileService } from './profile.service';
import catchAsync from '../../utils/catchAsync';
import { AuthenticatedRequest } from '../../middlewares/authenticatedRequest';
import { uploadToCloudinary } from '../../utils/cloudinary';

const createProfile = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email;
  
  // Handle photo upload if provided
  if (req.file) {
    const photoUrl = await uploadToCloudinary(req.file);
    req.body.userPhoto = photoUrl;
  }
  
  const profile = await ProfileService.createProfile(email!, req.body);

  res.status(201).json({
    success: true,
    message: 'Profile created successfully',
    data: profile,
  });
});

const getMyProfile = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email;
  let profile = await ProfileService.getProfileByEmail(email!);

  // If profile doesn't exist, create an empty one (for old users)
  if (!profile) {
    profile = await ProfileService.createProfile(email!, {});
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

const updateMyProfile = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email;
  
  // Handle photo upload if provided
  if (req.file) {
    const photoUrl = await uploadToCloudinary(req.file);
    req.body.userPhoto = photoUrl;
  }
  
  // Check if profile exists
  let profile = await ProfileService.getProfileByEmail(email!);
  
  // If profile doesn't exist, create it (for old users)
  if (!profile) {
    profile = await ProfileService.createProfile(email!, req.body);
  } else {
    // Update existing profile
    profile = await ProfileService.updateProfile(email!, req.body);
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: profile,
  });
});

export const ProfileController = {
  createProfile,
  getMyProfile,
  updateMyProfile,
};
