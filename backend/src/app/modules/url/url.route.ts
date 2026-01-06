import express, { Request, Response } from 'express';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  res.send('User route is working!');
});

// router.post('/create', );
// router.put('/update', );
// router.delete('/delete', );
// router.get('/stats', );


const urlRouter = router;
export default urlRouter;