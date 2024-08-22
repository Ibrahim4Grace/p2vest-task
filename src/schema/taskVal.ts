import { z } from 'zod';
import { TaskStatus } from '../models';

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  dueDate: z
    .string()
    .trim()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid due date'),
  status: z.nativeEnum(TaskStatus).optional(),
  assignedTo: z.string().trim().optional(),
  tags: z.array(z.string().trim().uuid()).optional(),
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(['To-Do', 'In Progress', 'Completed']),
});

export const addTagsSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  tag: z.string().trim().min(1, 'Tag is required'),
});
