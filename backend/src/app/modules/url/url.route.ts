import express from 'express';
import { protect } from '../../middlewares/authenticatedRequest';
import validateRequest from '../../middlewares/validateRequest';
import urlControllers from './url.controller';
import zodValidations from './url.validation';

const router = express.Router();

// List all URLs for current user
router.get("/", protect, urlControllers.getMyUrlList);

// Create new short URL
router.post("/", protect, validateRequest(zodValidations.createUrlSchema), urlControllers.createUrlController);

// Get user dashboard stats
router.get('/stats', protect, urlControllers.getUserDashboardStats);

// Get user analytics
router.get('/analytics', protect, urlControllers.getUserAnalytics);

// Update URL (toggle status)
router.patch("/:id", protect, urlControllers.toggleUrlStatus);

// Delete URL (soft delete)
router.delete('/:id', protect, validateRequest(zodValidations.deleteUrlSchema), urlControllers.deleteMyUrl);

const urlRouter = router;
export default urlRouter;
