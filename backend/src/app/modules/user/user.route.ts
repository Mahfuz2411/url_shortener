import express, { Request, Response } from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userValidation from "./user.validation";
import upload from "../../middlewares/upload";
import { protect } from "./user.middleware";

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  res.send('User route is working!');
});

router.post(
  '/create',
  upload.single('photo'),
  validateRequest(userValidation.createUserZodSchema),
  userControllers.createUser
);
router.post(
  '/login', 
  validateRequest(userValidation.loginUserZodSchema), 
  userControllers.loginUser
);

router.get('/me', protect, userControllers.getMe);

// router.get('/users',);
// router.get('/user/:id',);


const userRouter = router;
export default userRouter;