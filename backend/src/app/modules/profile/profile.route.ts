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

router.post(
  '/create',
  protect,
  upload.single('photo'),
  validateRequest(createProfileValidationSchema),
  ProfileController.createProfile
);

router.get('/me', protect, ProfileController.getMyProfile);

router.patch(
  '/update',
  protect,
  upload.single('photo'),
  validateRequest(updateProfileValidationSchema),
  ProfileController.updateMyProfile
);

export const ProfileRoutes = router;
