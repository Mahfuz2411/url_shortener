import express from 'express';
import userControllers from '../user/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import userValidation from '../user/user.validation';
import { protect } from '../../middlewares/authenticatedRequest';

const router = express.Router();

// Registration
router.post(
  '/register',
  validateRequest(userValidation.createUserZodSchema),
  userControllers.createUser
);

// Email Verification (GET for backward compatibility with email links)
router.get('/verify-email', userControllers.verifyEmail);

router.post(
  '/resend-verification',
  validateRequest(userValidation.resendVerificationSchema),
  userControllers.resendVerificationEmail
);

// Authentication
router.post(
  '/login',
  validateRequest(userValidation.loginUserZodSchema),
  userControllers.loginUser
);

router.post('/logout', userControllers.logoutUser);

// Password Reset
router.post(
  '/password-reset',
  validateRequest(userValidation.requestPasswordResetSchema),
  userControllers.requestPasswordReset
);

router.put(
  '/password-reset',
  validateRequest(userValidation.resetPasswordSchema),
  userControllers.resetPassword
);

// Get Current User
router.get('/me', protect, userControllers.getMe);

const authRouter = router;
export default authRouter;
