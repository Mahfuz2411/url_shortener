import express from 'express';
import { ProfileController } from './profile.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createProfileValidationSchema,
  updateProfileValidationSchema,
} from './profile.validation';
import { protect } from '../../middlewares/authenticatedRequest';
import upload from '../../middlewares/upload';

const router = express.Router();

// Get current user's profile
router.get('/me', protect, ProfileController.getMyProfile);

// Create profile
router.post(
  '/',
  protect,
  upload.single('photo'),
  validateRequest(createProfileValidationSchema),
  ProfileController.createProfile
);

// Update current user's profile
router.patch(
  '/me',
  protect,
  upload.single('photo'),
  validateRequest(updateProfileValidationSchema),
  ProfileController.updateMyProfile
);

const profileRouter = router;
export default profileRouter;
