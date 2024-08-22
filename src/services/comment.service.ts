import AppDataSource from '../data-source';
import { Comment, Task, User } from '../models';
import { ResourceNotFound, Unauthorized } from '../middleware';

export class CommentService {
  private commentRepository = AppDataSource.getRepository(Comment);
  private taskRepository = AppDataSource.getRepository(Task);
  private userRepository = AppDataSource.getRepository(User);

  async addComment(
    userId: string,
    taskId: string,
    content: string
  ): Promise<Comment | null> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) return null;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) return null;

    const comment = new Comment();
    comment.content = content;
    comment.task = task;
    comment.user = user;

    return this.commentRepository.save(comment);
  }

  public async editComment(
    commentId: string,
    userId: string,
    content: string
  ): Promise<{ comment: Comment; message: string }> {
    const existingComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user', 'task'],
    });

    if (!existingComment) {
      throw new ResourceNotFound('Comment Not Found');
    }

    if (existingComment.user.id !== userId) {
      throw new Unauthorized('You do not have permission to edit this comment');
    }

    await this.commentRepository.update(commentId, { content });

    const updatedComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user', 'task'],
    });

    if (!updatedComment) {
      throw new ResourceNotFound('Comment Not Found');
    }

    return {
      comment: updatedComment,
      message: 'Comment updated successfully',
    };
  }

  async deleteComment(
    commentId: string,
    userId: string,
    isAdmin: boolean
  ): Promise<boolean> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (!comment) return false;

    if (comment.user.id !== userId && !isAdmin) {
      return false;
    }

    await this.commentRepository.delete(commentId);
    return true;
  }
}
