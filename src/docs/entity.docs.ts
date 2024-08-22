export const taskSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "task-uuid"
 *         title:
 *           type: string
 *           example: "Implement new feature"
 *         description:
 *           type: string
 *           example: "Implement a new feature in the application"
 *         due_date:
 *           type: string
 *           format: date-time
 *           example: "2024-08-30T18:00:00Z"
 *         status:
 *           type: string
 *           enum: [To-Do, In Progress, Completed]
 *           example: "To-Do"
 *         assigned_to:
 *           type: string
 *           example: "user-uuid"
 *         created_by:
 *           type: string
 *           example: "creator-uuid"
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-22T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-22T12:00:00Z"
 */
`;

export const TagsSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "tag-uuid"
 *         name:
 *           type: string
 *           example: "Urgent"
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-22T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-22T12:00:00Z"
 */
`;

export const commentSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "comment-uuid"
 *         content:
 *           type: string
 *           example: "This task needs to be completed by the end of the day."
 *         task:
 *           type: string
 *           example: "task-uuid"
 *         user:
 *           type: string
 *           example: "user-uuid"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-22T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-22T12:00:00Z"
 */
`;
