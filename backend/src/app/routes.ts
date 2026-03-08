import { Router } from 'express';
import userRouter from './modules/user/user.route';
import urlRouter from './modules/url/url.route';
import { ProfileRoutes } from './modules/profile/profile.route';
import redirectRouter from './modules/redirect/redirect.route';

const router = Router();

router.use('/user', userRouter);
router.use('/profile', ProfileRoutes);
router.use('/url', urlRouter);
router.use('/redirect', redirectRouter);

export default router;
