import express from 'express';
import crypto from 'crypto';
import { getCommentsSheet } from '../config/googleSheets.js';
import { requireAuth } from '../middleware/auth.js';

// mergeParams lets this router read :articleId even though it's mounted
// under the same base path as articles.js (see server.js)
const router = express.Router({ mergeParams: true });

function toCommentJson(row) {
  return {
    id: row.get('id'),
    articleId: row.get('articleId'),
    author: row.get('authorName'),
    authorAvatar: row.get('authorAvatar'),
    text: row.get('text'),
    date: row.get('createdAt'),
  };
}

// GET /api/articles/:articleId/comments — public
router.get('/:articleId/comments', async (req, res) => {
  try {
    const sheet = await getCommentsSheet();
    const rows = await sheet.getRows();
    const comments = rows
      .filter((r) => r.get('articleId') === req.params.articleId)
      .map(toCommentJson);
    res.json(comments);
  } catch (err) {
    console.error('List comments error:', err);
    res.status(500).json({ error: 'Could not load comments.' });
  }
});

// POST /api/articles/:articleId/comments — only logged-in users
router.post('/:articleId/comments', requireAuth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Comment text is required.' });
    }

    const sheet = await getCommentsSheet();
    const row = await sheet.addRow({
      id: crypto.randomUUID(),
      articleId: req.params.articleId,
      authorId: req.user.id,
      authorName: req.user.name,
      authorAvatar: req.user.avatarUrl || '',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(toCommentJson(row));
  } catch (err) {
    console.error('Create comment error:', err);
    res.status(500).json({ error: 'Something went wrong posting the comment.' });
  }
});

export default router;