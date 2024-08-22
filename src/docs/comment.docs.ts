const createCommentDocs = `

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add a comment to a task
 *     description: Adds a comment to a task.
 *     tags:
 *       - Comments
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is a comment"
 *               taskId:
 *                 type: string
 *                 example: "task-id"
 *     responses:
 *       201:
 *         description: Comment successfully added
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
`;

const updateCommentDocs = `

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Edit a comment
 *     description: Edits a comment by its ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: commentId
 *         in: path
 *         description: The ID of the comment to edit
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated comment"
 *     responses:
 *       200:
 *         description: Comment successfully updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Comment not found
 */
`;

const deleteCommentDocs = `

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment by its ID. Admins can delete any comment, users can only delete their own comments.
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: commentId
 *         in: path
 *         description: The ID of the comment to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment successfully deleted
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Comment not found
 */
`;
