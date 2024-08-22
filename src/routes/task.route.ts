import { Router } from 'express';
import { authMiddleware, checkRole, validateData } from '../middleware';
import { UserRole } from '../models';
import {
  createTaskSchema,
  updateTaskStatusSchema,
  addTagsSchema,
} from '../schema';
import {
  createTask,
  updateTaskStatus,
  getTasksByUser,
  addTagsToTask,
  filterTasksByTag,
  getTasks,
} from '../controllers';

const taskRouter = Router();

taskRouter.post(
  '/tasks',
  authMiddleware,
  checkRole([UserRole.USER]),
  validateData(createTaskSchema),
  createTask
);
taskRouter.put(
  '/tasks/:id/status',
  authMiddleware,
  checkRole([UserRole.USER, UserRole.SUPER_ADMIN]),
  validateData(updateTaskStatusSchema),
  updateTaskStatus
);

taskRouter.get('/tasks', authMiddleware, checkRole([UserRole.USER]), getTasks);

taskRouter.get(
  '/tasks/user/:userId',
  authMiddleware,
  checkRole([UserRole.USER]),
  getTasksByUser
);

taskRouter.post(
  '/tasks/:taskId/tag',
  authMiddleware,
  checkRole([UserRole.USER]),
  validateData(addTagsSchema),
  addTagsToTask
);

taskRouter.get(
  '/tasks/filter',
  authMiddleware,
  checkRole([UserRole.USER]),
  filterTasksByTag
);
export { taskRouter };
