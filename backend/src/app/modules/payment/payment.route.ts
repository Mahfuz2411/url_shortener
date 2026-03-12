import express from 'express';
import paymentControllers from './payment.controller';
import { protect } from '../../middlewares/authenticatedRequest';

const router = express.Router();

router.post('/initiate', protect, paymentControllers.initiate);
router.post('/success', paymentControllers.success);
router.post('/fail', paymentControllers.fail);
router.post('/cancel', paymentControllers.cancel);
router.post('/ipn', paymentControllers.ipn);

const paymentRouter = router;
export default paymentRouter;
