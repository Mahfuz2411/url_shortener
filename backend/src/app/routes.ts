import { Router } from 'express';
import userRouter from './modules/user/user.route';
import urlRouter from './modules/url/url.route';

const router = Router();


router.use('/user', userRouter);
router.use('/url', urlRouter); 


export default router;
