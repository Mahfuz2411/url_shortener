import { z } from 'zod';

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

const createUserZodSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(50),
        email: z.string().email({
            message: 'Invalid email address',
        }),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(32, 'Password must not exceed 32 characters')
            .regex(passwordRegex, {
                message:
                    'Password must contain uppercase, lowercase, number and special character',
            }),
        gender: z.enum(['Male', 'Female', 'Other']),
    }),
});


const loginUserZodSchema = z.object({
    body: z.object({
        email: z.string().email({
            message: 'Invalid email address',
        }),
        password: z.string().min(8, 'Password must be at least 8 characters').max(32, 'Password must not exceed 32 characters'),
    }),
});

const userValidation = {
    createUserZodSchema,
    loginUserZodSchema,
}

export default userValidation;
