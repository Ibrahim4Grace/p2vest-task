const createTaskDocs = `
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 */
`;

const updateTaskDocs = `
/**
 * @swagger
 * /tasks/{taskId}/status:
 *   put:
 *     summary: Update the status of a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskStatus'
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 */
`;

const getTaskDocs = `

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks with pagination and sorting
 *     description: Retrieve tasks with pagination and sorting options.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of tasks per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         description: Field to sort by (e.g., 'due_date')
 *         required: false
 *         schema:
 *           type: string
 *           default: due_date
 *       - name: order
 *         in: query
 *         description: Sort order ('ASC' or 'DESC')
 *         required: false
 *         schema:
 *           type: string
 *           default: ASC
 *       - name: status
 *         in: query
 *         description: Filter by task status
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks with pagination and sorting
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
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       400:
 *         description: Invalid input
 */
`;

const getTaskByIdDocs = `

/**
 * @swagger
 * /tasks/user/{userId}:
 *   get:
 *     summary: Get tasks assigned to a specific user
 *     description: Retrieves tasks assigned to a specific user based on their user ID. Accessible by users and admins.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to retrieve tasks for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 *       404:
 *         description: Tasks not found for the specified user ID
 *     security:
 *       - BearerAuth: []
 */
`;

const addTagToTaskDocs = `
/**
 * @swagger
 * /tasks/{taskId}/tags:
 *   post:
 *     summary: Add tags to a task
 *     description: Adds tags to a specific task by its ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: taskId
 *         in: path
 *         description: The ID of the task to which tags will be added
 *         required: true
 *         schema:
 *           type: string
 *       - name: tags
 *         in: body
 *         description: An array of tag IDs to be added to the task
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       200:
 *         description: Tags successfully added to the task
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task or tags not found
 */
`;

const fliterTaskByTagDocs = `
/**
 * @swagger
 * /tasks/filter:
 *   get:
 *     summary: Filter tasks by tag
 *     description: Retrieves tasks filtered by a specific tag name.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: tagName
 *         in: query
 *         description: The name of the tag to filter tasks by
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       404:
 *         description: No tasks found for the specified tag
 */
`;
