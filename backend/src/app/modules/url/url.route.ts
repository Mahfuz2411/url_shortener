import express, { Request, Response } from 'express';
import { protect } from '../../middlewares/authenticatedRequest';
import validateRequest from '../../middlewares/validateRequest';
import urlControllers from './url.controller';
import zodValidations from './url.validation';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  res.send('User route is working!');
});

router.post("/create", protect, validateRequest(zodValidations.createUrlSchema), urlControllers.createUrlController);
router.get("/list", protect, urlControllers.getMyUrlList);
router.delete('/delete', protect, validateRequest(zodValidations.deleteUrlSchema), urlControllers.deleteMyUrl);
// router.put('/update', );
// router.get('/stats', );


const urlRouter = router;
export default urlRouter;
