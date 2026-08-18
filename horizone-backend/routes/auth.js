import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsersSheet } from '../config/googleSheets.js';

const router = express.Router();

function signToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, avatarUrl } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const sheet = await getUsersSheet();
    const rows = await sheet.getRows();

    const existing = rows.find(
      (r) => (r.get('email') || '').toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();

    await sheet.addRow({
      id,
      name,
      email,
      passwordHash,
      avatarUrl: avatarUrl || '',
      createdAt: new Date().toISOString(),
    });

    const user = { id, name, email, avatarUrl: avatarUrl || '' };
    res.status(201).json({ token: signToken(user), user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Something went wrong creating the account.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const sheet = await getUsersSheet();
    const rows = await sheet.getRows();
    const row = rows.find((r) => (r.get('email') || '').toLowerCase() === email.toLowerCase());

    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const match = await bcrypt.compare(password, row.get('passwordHash'));
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = {
      id: row.get('id'),
      name: row.get('name'),
      email: row.get('email'),
      avatarUrl: row.get('avatarUrl') || '',
    };
    res.json({ token: signToken(user), user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Something went wrong logging in.' });
  }
});

export default router;