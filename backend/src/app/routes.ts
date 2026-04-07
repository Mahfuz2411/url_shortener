import { Router } from 'express';
import authRouter from './modules/auth/auth.route';
import urlRouter from './modules/url/url.route';
import profileRouter from './modules/profile/profile.route';
import redirectRouter from './modules/redirect/redirect.route';
import paymentRouter from './modules/payment/payment.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/urls', urlRouter);
router.use('/profiles', profileRouter);
router.use('/redirect', redirectRouter);
router.use('/payments', paymentRouter);

export default router;
