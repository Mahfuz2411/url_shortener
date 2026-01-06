import { Request, Response } from 'express'
import userServices from './user.service'
import catchAsync from '../../utils/catchAsync'
import { UserInterface } from './user.interface'
import { uploadToCloudinary } from '../../utils/cloudinary';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  if (req.file && req.file.buffer) {
    const photoUrl = await uploadToCloudinary(req.file);
    userData.userPhoto = photoUrl;
  }

  // console.log('Received user data:', userData);
  const newUser = await userServices.createUserService(userData);

  const userObject: UserInterface = newUser.toObject();
  const { password, ...result } = userObject;

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});


// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   // password select:true, কারণ schema এ select:false
//   const user = await User.findOne({ email }).select('+password');
//   if (!user) {
//     return res.status(401).json({ success: false, message: 'Invalid credentials' });
//   }

//   const isMatched = await user.isPasswordMatched(password);
//   if (!isMatched) {
//     return res.status(401).json({ success: false, message: 'Invalid credentials' });
//   }

//   // Generate JWT (example)
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
//     expiresIn: '7d',
//   });

//   // Remove password before sending
//   const { password: _, ...result } = user.toObject();

//   res.status(200).json({
//     success: true,
//     message: 'Login successful',
//     data: result,
//     token,
//   });
// });



const userControllers = {
  createUser,
}

export default userControllers
