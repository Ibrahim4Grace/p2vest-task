export const createTaskDocs = `
/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Implement new feature"
 *               description:
 *                 type: string
 *                 example: "Implement a new feature in the application"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-30T18:00:00Z"
 *               status:
 *                 type: string
 *                 enum: [To-Do, In Progress, Completed]
 *                 example: "To-Do"
 *               assignedTo:
 *                 type: string
 *                 description: "UUID of the user to whom the task is assigned"
 *                 example: "user-uuid"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     task:
 *                       $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */

`;

export const updateTaskDocs = `
/**
 * @swagger
 * /api/v1/tasks/{id}/status:
 *   put:
 *     summary: Update the status of a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [To-Do, In Progress, Completed]
 *                 example: "In Progress"
 *     responses:
 *       201:
 *         description: Task successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Task successfully updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     task:
 *                       $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Some server error
 */

`;

export const getTaskDocs = `

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get a list of tasks with pagination, sorting, and filtering
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of tasks per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: "due_date"
 *         description: The field to sort tasks by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           example: "ASC"
 *         description: The order to sort tasks (ASC or DESC)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [To-Do, In Progress, Completed]
 *           example: "In Progress"
 *         description: Filter tasks by status
 *     responses:
 *       200:
 *         description: A list of tasks with pagination information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 total:
 *                   type: number
 *                   example: 25
 *                 page:
 *                   type: number
 *                   example: 1
 *                 totalPages:
 *                   type: number
 *                   example: 3
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
`;

export const getTaskByIdDocs = `
/**
 * @swagger
 * /api/v1/tasks/user/{userId}:
 *   get:
 *     summary: Get all tasks assigned to a specific user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the user whose tasks are being retrieved
 *     responses:
 *       201:
 *         description: Task successfully found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Task successfully found
 *                 data:
 *                   type: object
 *                   properties:
 *                     tasks:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
`;

export const addTagToTaskDocs = `
/**
 * @swagger
 * /api/v1/tasks/{taskId}/tag:
 *   post:
 *     summary: Add a tag to a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the task to which the tag is being added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag:
 *                 type: string
 *                 example: "Urgent"
 *     responses:
 *       200:
 *         description: Tag successfully added to the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Tag "Urgent" successfully added to the task
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Some server error
 */
`;

export const fliterTaskByTagDocs = `
/**
 * @swagger
 * /api/v1/tasks/filter:
 *   get:
 *     summary: Filter tasks by tag
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tagName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the tag to filter tasks by
 *     responses:
 *       200:
 *         description: Tasks successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Tasks successfully retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     tasks:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Task'
 *       404:
 *         description: No tasks found for the specified tag
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
`;
