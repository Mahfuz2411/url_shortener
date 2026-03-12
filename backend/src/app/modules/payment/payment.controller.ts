import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthenticatedRequest } from '../../middlewares/authenticatedRequest';
import { initiatePaymentService, verifyAndUpgradeService } from './payment.service';
import config from '../../config';

const initiate = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const { userId, email } = req.user as { userId: string; email: string; status: string };

  const result = await initiatePaymentService(userId, email);

  return res.json({ success: true, url: result.url });
});

const success = catchAsync(async (req: Request, res: Response) => {
  const { val_id, tran_id } = req.body as { val_id: string; tran_id: string };

  try {
    await verifyAndUpgradeService(val_id, tran_id);
    return res.redirect(`${config.origin_url}/payment/success`);
  } catch {
    return res.redirect(`${config.origin_url}/payment/fail`);
  }
});

const fail = catchAsync(async (_req: Request, res: Response) => {
  return res.redirect(`${config.origin_url}/payment/fail`);
});

const cancel = catchAsync(async (_req: Request, res: Response) => {
  return res.redirect(`${config.origin_url}/payment/fail`);
});

const ipn = catchAsync(async (req: Request, res: Response) => {
  // IPN (Instant Payment Notification) - server-to-server verification backup
  const { val_id, tran_id, status } = req.body as {
    val_id: string;
    tran_id: string;
    status: string;
  };

  if (status === 'VALID' || status === 'VALIDATED') {
    try {
      await verifyAndUpgradeService(val_id, tran_id);
    } catch {
      // already upgraded or invalid, silently ignore
    }
  }

  return res.status(200).json({ success: true });
});

const paymentControllers = { initiate, success, fail, cancel, ipn };
export default paymentControllers;
