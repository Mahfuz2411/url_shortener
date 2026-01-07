import express, { Request, Response } from 'express';
import { protect } from '../../middlewares/authenticatedRequest';
import validateRequest from '../../middlewares/validateRequest';
import createUrlSchema from './url.validation';
import urlControllers from './url.controller';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  res.send('User route is working!');
});

router.post("/create", protect, validateRequest(createUrlSchema), urlControllers.createUrlController);
// router.put('/update', );
// router.delete('/delete', );
// router.get('/stats', );


const urlRouter = router;
export default urlRouter;
