import { z } from 'zod';

const ALLOWED_SPECIAL = '@$!%*?&._+\-';
const allowedCharsRegex = /^[A-Za-z\d@$!%*?&._+\-]+$/;
const specialCharRegex = /[@$!%*?&._+\-]/;

function validatePassword(password: string, ctx: z.RefinementCtx) {
    if (password.length < 8) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must be at least 8 characters' });
    }
    if (password.length > 32) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must not exceed 32 characters' });
    }
    if (!/[a-z]/.test(password)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must contain at least one lowercase letter (a-z)' });
    }
    if (!/[A-Z]/.test(password)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must contain at least one uppercase letter (A-Z)' });
    }
    if (!/\d/.test(password)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must contain at least one number (0-9)' });
    }
    if (!specialCharRegex.test(password)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Password must contain at least one special character (${ALLOWED_SPECIAL})` });
    }
    if (!allowedCharsRegex.test(password)) {
        const invalidChars = password
            .split('')
            .filter(c => !allowedCharsRegex.test(c))
            .filter((c, i, arr) => arr.indexOf(c) === i)
            .join(', ');
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Password contains invalid character(s): "${invalidChars}". Only letters, numbers and ${ALLOWED_SPECIAL} are allowed` });
    }
}

const createUserZodSchema = z.object({
    body: z.object({
        fullName: z.string().min(3, 'Full name must be at least 3 characters').max(50, 'Full name must not exceed 50 characters'),
        email: z.string().email({
            message: 'Invalid email address',
        }),
        password: z.string().superRefine(validatePassword),
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
        newPassword: z.string().superRefine(validatePassword),
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
