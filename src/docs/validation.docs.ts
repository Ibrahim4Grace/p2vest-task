export const signUpZod = `
/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignUp:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           description: User's password
 *           example: "password123"
 */

`;

export const loginZod = `
/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           description: User's password
 *           example: "password123"
 */

`;

export const createTaskZod = `
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the task
 *           example: "Implement new feature"
 *         description:
 *           type: string
 *           description: Description of the task
 *           example: "Implement a new feature in the application"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Due date of the task
 *           example: "2024-08-30T18:00:00Z"
 *         status:
 *           type: string
 *           enum: [To-Do, In Progress, Completed]
 *           description: Status of the task
 *           example: "To-Do"
 *         assignedTo:
 *           type: string
 *           description: ID of the user assigned to the task
 *           example: "user-uuid"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: Tags associated with the task
 *           example: ["tag-uuid"]
 *       required:
 *         - title
 *         - description
 *         - dueDate
 */
`;

export const updatetaskZod = `
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateTaskStatus:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [To-Do, In Progress, Completed]
 *           description: Status to update the task to
 *           example: "In Progress"
 *       required:
 *         - status
 */

`;

export const addTagZod = `
/**
 * @swagger
 * components:
 *   schemas:
 *     AddTags:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the tag
 *           example: "Urgent"
 *         tag:
 *           type: string
 *           description: Tag to add to the task
 *           example: "bug"
 *       required:
 *         - name
 *         - tag
 */
`;

export const addCommentZod = `
/**
 * @swagger
 * components:
 *   schemas:
 *     AddComment:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: Content of the comment
 *           example: "This is a comment."
 *         taskId:
 *           type: string
 *           format: uuid
 *           description: ID of the task the comment is associated with
 *           example: "task-uuid"
 *       required:
 *         - content
 *         - taskId
 */
`;

export const editCommentZod = `
/**
 * @swagger
 * components:
 *   schemas:
 *     EditComment:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: Updated content of the comment
 *           example: "This is an updated comment."
 *       required:
 *         - content
 */
`;
