import express from 'express';
import paymentControllers from './payment.controller';
import { protect } from '../../middlewares/authenticatedRequest';

const router = express.Router();

// Initiate payment
router.post('/', protect, paymentControllers.initiate);

// Payment callbacks
router.all('/callback/success', paymentControllers.success);
router.all('/callback/fail', paymentControllers.fail);
router.all('/callback/cancel', paymentControllers.cancel);

// Payment webhook/IPN
router.post('/webhook', paymentControllers.ipn);

const paymentRouter = router;
export default paymentRouter;
