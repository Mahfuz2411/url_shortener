import express, { Request, Response } from 'express';
import userControllers from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import userValidation from './user.validation';
import { protect } from '../../middlewares/authenticatedRequest';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('User route is working!');
});

// Registration
router.post(
  '/create',
  validateRequest(userValidation.createUserZodSchema),
  userControllers.createUser
);

// Email Verification
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
  '/request-password-reset',
  validateRequest(userValidation.requestPasswordResetSchema),
  userControllers.requestPasswordReset
);

router.post(
  '/reset-password',
  validateRequest(userValidation.resetPasswordSchema),
  userControllers.resetPassword
);

// Protected Routes
router.get('/me', protect, userControllers.getMe);

const userRouter = router;
export default userRouter;