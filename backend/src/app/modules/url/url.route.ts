import express, { Request, Response } from 'express';
import { protect } from '../../middlewares/authenticatedRequest';
import validateRequest from '../../middlewares/validateRequest';
import urlControllers from './url.controller';
import zodValidations from './url.validation';

const router = express.Router();
// router.get('/', (req: Request, res: Response) => {
//   res.send('User route is working!');
// });

// router.use((req, res, next) => {
//   console.log(`[MAIN ROUTER] ${req.method} ${req.originalUrl}`);
//   next();
// });


router.post("/create", protect, validateRequest(zodValidations.createUrlSchema), urlControllers.createUrlController);
router.get("/list", protect, urlControllers.getMyUrlList);
router.delete('/delete', protect, validateRequest(zodValidations.deleteUrlSchema), urlControllers.deleteMyUrl);
router.get('/stats', protect, urlControllers.getUserDashboardStats);
// router.put('/update', );


const urlRouter = router;
export default urlRouter;
