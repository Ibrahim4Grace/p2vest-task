import { Request, Response } from 'express';
import { TaskService } from '../services';
import { TaskStatus } from '../models';
import { asyncHandler, sendJsonResponse } from '../helper';

const taskService = new TaskService();

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, dueDate, status, assignedTo } = req.body;
  const task = await taskService.createTask(
    title,
    description,
    dueDate,
    status,
    assignedTo
  );
  sendJsonResponse(res, 201, 'Task created successfully', { task });
});

export const updateTaskStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const task = await taskService.updateTaskStatus(id, status as TaskStatus);
    sendJsonResponse(res, 201, 'Task successfully updated', { task });
  }
);

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = (req.query.sortBy as string) || 'due_date';
  const order = (req.query.order as 'ASC' | 'DESC') || 'ASC';
  const status = req.query.status as string;

  const { tasks, total } = await taskService.getTasks(
    page,
    limit,
    sortBy,
    order,
    status
  );

  res.json({
    tasks,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

export const getTasksByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const tasks = await taskService.getTasksByUser(userId);
    sendJsonResponse(res, 201, 'Task successfully found', { tasks });
  }
);

export const addTagsToTask = asyncHandler(
  async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { tag } = req.body;

    const message = await taskService.addTagsToTask(taskId, tag);

    sendJsonResponse(res, 200, message);
  }
);

export const filterTasksByTag = asyncHandler(
  async (req: Request, res: Response) => {
    const { tagName } = req.query;
    const tasks = await taskService.getTasksByTag(tagName as string);
    if (tasks.length > 0) {
      sendJsonResponse(res, 200, 'Tasks successfully retrieved', { tasks });
    } else {
      sendJsonResponse(res, 404, 'No tasks found for the specified tag');
    }
  }
);
