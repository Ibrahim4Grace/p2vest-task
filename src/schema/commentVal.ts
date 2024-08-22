import { z } from 'zod';

export const addCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(2, 'Content must be at least 2 characters long')
    .max(100, "Content can't exceed 100 characters"),
  taskId: z.string().uuid('Invalid task ID'),
});

export const editCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(2, 'Content must be at least 2 characters long')
    .max(100, "Content can't exceed 100 characters"),
});
