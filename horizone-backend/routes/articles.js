import express from 'express';
import crypto from 'crypto';
import { getArticlesSheet, getLikesSheet, getCommentsSheet } from '../config/googleSheets.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80';
const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=80&q=80';

/**
 * Shapes a sheet row into the same schema the frontend already expects
 * from the dev.to API (see normalize() in index.html), so backend-created
 * articles merge into the grid without any special-casing on the client.
 * `authorId` is an extra field the frontend uses to build "My articles".
 * likeCounts/commentCounts are optional maps ({ [articleId]: number })
 * built once per list request instead of querying per-article.
 */
function toArticleJson(row, likeCounts = {}, commentCounts = {}) {
  const id = row.get('id');
  return {
    id,
    title: row.get('title'),
    description: row.get('description'),
    cover_image: row.get('image') || FALLBACK_COVER,
    user: {
      name: row.get('authorName'),
      profile_image_90: row.get('authorAvatar') || FALLBACK_AVATAR,
    },
    tag_list: row.get('category') ? [row.get('category')] : [],
    published_at: row.get('createdAt'),
    positive_reactions_count: likeCounts[id] || 0,
    comments_count: commentCounts[id] || 0,
    body: row.get('body'),
    authorId: row.get('authorId'),
  };
}

// GET /api/articles — public, returns every article (newest first),
// with real like/comment counts computed from the Likes and Comments sheets.
router.get('/', async (req, res) => {
  try {
    const [articlesSheet, likesSheet, commentsSheet] = await Promise.all([
      getArticlesSheet(),
      getLikesSheet(),
      getCommentsSheet(),
    ]);

    const [articleRows, likeRows, commentRows] = await Promise.all([
      articlesSheet.getRows(),
      likesSheet.getRows(),
      commentsSheet.getRows(),
    ]);

    const likeCounts = {};
    likeRows.forEach((r) => {
      const articleId = r.get('articleId');
      likeCounts[articleId] = (likeCounts[articleId] || 0) + 1;
    });

    const commentCounts = {};
    commentRows.forEach((r) => {
      const articleId = r.get('articleId');
      commentCounts[articleId] = (commentCounts[articleId] || 0) + 1;
    });

    const articles = articleRows
      .map((row) => toArticleJson(row, likeCounts, commentCounts))
      .reverse();

    res.json(articles);
  } catch (err) {
    console.error('List articles error:', err);
    res.status(500).json({ error: 'Could not load articles.' });
  }
});

// POST /api/articles — only logged-in users (requireAuth) may publish
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, body, image, category } = req.body;

    if (!title || !description || !body) {
      return res.status(400).json({ error: 'Title, description and body are required.' });
    }

    const sheet = await getArticlesSheet();
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const row = await sheet.addRow({
      id,
      title,
      description,
      body,
      image: image || '',
      category: category || '',
      authorId: req.user.id,
      authorName: req.user.name,
      authorAvatar: req.user.avatarUrl || '',
      createdAt,
    });

    res.status(201).json(toArticleJson(row));
  } catch (err) {
    console.error('Create article error:', err);
    res.status(500).json({ error: 'Something went wrong publishing the article.' });
  }
});

// PUT /api/articles/:id — seul l'auteur peut modifier son article
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, body, image, category } = req.body;

    if (!title || !description || !body) {
      return res.status(400).json({ error: 'Title, description and body are required.' });
    }

    const sheet = await getArticlesSheet();
    const rows = await sheet.getRows();
    const row = rows.find((r) => r.get('id') === id);

    if (!row) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    if (row.get('authorId') !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own articles.' });
    }

    row.set('title', title);
    row.set('description', description);
    row.set('body', body);
    row.set('image', image || '');
    row.set('category', category || '');
    await row.save();

    res.json(toArticleJson(row));
  } catch (err) {
    console.error('Update article error:', err);
    res.status(500).json({ error: 'Something went wrong updating the article.' });
  }
});

// DELETE /api/articles/:id — seul l'auteur peut supprimer son article
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const sheet = await getArticlesSheet();
    const rows = await sheet.getRows();
    const row = rows.find((r) => r.get('id') === id);

    if (!row) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    if (row.get('authorId') !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own articles.' });
    }

    await row.delete();
    res.json({ ok: true, id });
  } catch (err) {
    console.error('Delete article error:', err);
    res.status(500).json({ error: 'Something went wrong deleting the article.' });
  }
});

export default router;