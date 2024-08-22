import AppDataSource from '../data-source';
import { Task, User, TaskStatus, Tag } from '../models';
import { ResourceNotFound } from '../middleware';

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);
  private tagRepository = AppDataSource.getRepository(Tag);

  async createTask(
    title: string,
    description: string,
    dueDate: string,
    status: TaskStatus,
    assignedToId?: string
  ): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.due_date = new Date(dueDate);
    task.status = status;
    if (assignedToId) {
      const assignedTo = await AppDataSource.getRepository(User).findOneBy({
        id: assignedToId,
      });
      if (assignedTo) {
        task.assigned_to = assignedTo;
      }
    }
    return this.taskRepository.save(task);
  }

  public async updateTaskStatus(
    id: string,
    status: TaskStatus
  ): Promise<{ task: Task; message: string }> {
    const existingTask = await this.taskRepository.findOne({
      where: { id },
    });

    if (!existingTask) {
      throw new ResourceNotFound('Task Not Found');
    }

    await this.taskRepository.update(id, { status });

    const updatedTask = await this.taskRepository.findOne({
      where: { id },
    });

    if (!updatedTask) {
      throw new ResourceNotFound('Task Not Found');
    }

    return {
      task: updatedTask,
      message: 'Task status updated successfully',
    };
  }

  async getTasks(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'due_date',
    order: 'ASC' | 'DESC' = 'ASC',
    status?: string
  ): Promise<{ tasks: Task[]; total: number }> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    queryBuilder
      .orderBy(`task.${sortBy}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const [tasks, total] = await queryBuilder.getManyAndCount();

    return { tasks, total };
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { assigned_to: { id: userId } },
    });
  }

  async addTagsToTask(taskId: string, tagName: string): Promise<string> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['tags'],
    });
    if (!task) return 'Task not found';

    let tag = await this.tagRepository.findOneBy({ name: tagName });
    if (!tag) {
      tag = this.tagRepository.create({ name: tagName });
      await this.tagRepository.save(tag);
    }

    const isTagAssigned = task.tags.some(
      (existingTag) => existingTag.id === tag.id
    );

    if (isTagAssigned) {
      return `Tag "${tagName}" is already assigned to this task`;
    }

    task.tags.push(tag);
    await this.taskRepository.save(task);

    return `Tag "${tagName}" successfully added to the task`;
  }

  async getTasksByTag(tagName: string): Promise<Task[]> {
    const tag = await this.tagRepository.findOne({
      where: { name: tagName },
      relations: ['tasks'],
    });

    if (!tag) {
      return [];
    }

    return tag.tasks || [];
  }
}
