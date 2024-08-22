import { z } from 'zod';

export const userSignUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, "Name can't exceed 100 characters"),
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, "Password can't exceed 100 characters"),
});

export const userSigninSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string().trim().min(6, 'Password is required'),
});

export type IUserSignUpSchema = z.infer<typeof userSignUpSchema>;
