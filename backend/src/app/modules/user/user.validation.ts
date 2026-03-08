import { z } from 'zod';

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

const createUserZodSchema = z.object({
    body: z.object({
        fullName: z.string().min(3, 'Full name must be at least 3 characters').max(50, 'Full name must not exceed 50 characters'),
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
        confirmPassword: z.string(),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
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

const resendVerificationSchema = z.object({
    body: z.object({
        email: z.string().email({
            message: 'Invalid email address',
        }),
    }),
});

const requestPasswordResetSchema = z.object({
    body: z.object({
        email: z.string().email({
            message: 'Invalid email address',
        }),
    }),
});

const resetPasswordSchema = z.object({
    body: z.object({
        token: z.string(),
        newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(32, 'Password must not exceed 32 characters')
            .regex(passwordRegex, {
                message:
                    'Password must contain uppercase, lowercase, number and special character',
            }),
        confirmPassword: z.string(),
    }).refine(data => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    }),
});

const userValidation = {
    createUserZodSchema,
    loginUserZodSchema,
    resendVerificationSchema,
    requestPasswordResetSchema,
    resetPasswordSchema,
}

export default userValidation;
