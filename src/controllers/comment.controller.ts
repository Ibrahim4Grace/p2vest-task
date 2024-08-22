import { Request, Response } from 'express';
import { CommentService } from '../services';
import { asyncHandler, sendJsonResponse } from '../helper';
import { UserRole } from '../models';

const commentService = new CommentService();

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const { content, taskId } = req.body;
  const userId = req.user?.user_id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const comment = await commentService.addComment(userId, taskId, content);
  sendJsonResponse(res, 201, 'Comment added successfully', { comment });
});

export const editComment = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user?.user_id;
  if (!userId) {
    return sendJsonResponse(res, 401, 'Unauthorized');
  }

  const comment = await commentService.editComment(commentId, userId, content);
  sendJsonResponse(res, 200, 'Comment updated successfully', { comment });
});

export const deleteComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const userId = req.user?.user_id;
    const isAdmin = req.user?.role.includes(UserRole.SUPER_ADMIN);
    const result = await commentService.deleteComment(
      commentId,
      userId,
      isAdmin
    );
    if (result) {
      sendJsonResponse(res, 200, 'Comment deleted successfully');
    } else {
      res.status(404).json({ message: 'Comment not found or unauthorized' });
    }
  }
);
