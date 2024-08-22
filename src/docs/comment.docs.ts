export const createCommentDocs = `
/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Add a new comment to a task
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "task-uuid"
 *               content:
 *                 type: string
 *                 example: "This is a comment on the task."
 *     responses:
 *       201:
 *         description: Comment added successfully
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
 *                   example: Comment added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         content:
 *                           type: string
 *                         created_at:
 *                           type: string
 *                         task:
 *                           type: string
 *                         user:
 *                           type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
`;

export const updateCommentDocs = `
/**
 * @swagger
 * /api/v1/comments/{commentId}:
 *   put:
 *     summary: Edit an existing comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated comment content."
 *     responses:
 *       200:
 *         description: Comment updated successfully
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
 *                   example: Comment updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         content:
 *                           type: string
 *                         created_at:
 *                           type: string
 *                         task:
 *                           type: string
 *                         user:
 *                           type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Some server error
 */

`;

export const deleteCommentDocs = `
/**
 * @swagger
 * /api/v1/comments/{commentId}:
 *   delete:
 *     summary: Delete an existing comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
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
 *                   example: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found or unauthorized
 *       500:
 *         description: Some server error
 */
`;
