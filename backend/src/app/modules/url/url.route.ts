import express, { Request, Response } from 'express';
import { protect } from '../../middlewares/authenticatedRequest';
import validateRequest from '../../middlewares/validateRequest';
import urlControllers from './url.controller';
import zodValidations from './url.validation';

const router = express.Router();

router.post("/create", protect, validateRequest(zodValidations.createUrlSchema), urlControllers.createUrlController);
router.get("/list", protect, urlControllers.getMyUrlList);
router.patch("/toggle", protect, urlControllers.toggleUrlStatus);
router.delete('/delete', protect, validateRequest(zodValidations.deleteUrlSchema), urlControllers.deleteMyUrl);
router.delete('/softdelete', protect, validateRequest(zodValidations.deleteUrlSchema), urlControllers.deleteMyUrl);
router.get('/stats', protect, urlControllers.getUserDashboardStats);
router.get('/analytics', protect, urlControllers.getUserAnalytics);


const urlRouter = router;
export default urlRouter;
