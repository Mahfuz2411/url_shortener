import express, { Request, Response } from "express";
import userControllers from "./user.controller";

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  res.send('User route is working!');
});

router.post('/create', userControllers.createUser);
router.post('/login', );

router.get('/users',);
router.get('/user/:id', );


const userRouter = router;
export default userRouter;