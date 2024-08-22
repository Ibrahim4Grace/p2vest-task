import { Router } from 'express';
import { addComment, editComment, deleteComment } from '../controllers';
import { authMiddleware, validateData, checkRole } from '../middleware';
import { UserRole } from '../models';
import { addCommentSchema, editCommentSchema } from '../schema';

const commentRouter = Router();

commentRouter.post(
  '/comments',
  authMiddleware,
  checkRole([UserRole.USER]),
  validateData(addCommentSchema),
  addComment
);

commentRouter.put(
  '/comments/:commentId',
  authMiddleware,
  checkRole([UserRole.USER]),
  validateData(editCommentSchema),
  editComment
);

commentRouter.delete(
  '/comments/:commentId',
  authMiddleware,
  checkRole([UserRole.USER, UserRole.SUPER_ADMIN]),
  deleteComment
);

export { commentRouter };
