import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

let usersSheetCache = null;
let articlesSheetCache = null;

/**
 * Returns the "Users" worksheet, creating it (with the right header row)
 * the first time the backend runs if it doesn't already exist.
 */
export async function getUsersSheet() {
  if (usersSheetCache) return usersSheetCache;

  await doc.loadInfo();

  let sheet = doc.sheetsByTitle['Users'];
  if (!sheet) {
    sheet = await doc.addSheet({
      title: 'Users',
      headerValues: ['id', 'name', 'email', 'passwordHash', 'avatarUrl', 'createdAt'],
    });
  }

  usersSheetCache = sheet;
  return sheet;
}

/**
 * Returns the "Articles" worksheet — a separate tab in the SAME spreadsheet
 * as "Users" (same GOOGLE_SHEET_ID), creating it with the right header row
 * the first time the backend runs if it doesn't already exist.
 */
export async function getArticlesSheet() {
  if (articlesSheetCache) return articlesSheetCache;

  await doc.loadInfo();

  let sheet = doc.sheetsByTitle['Articles'];
  if (!sheet) {
    sheet = await doc.addSheet({
      title: 'Articles',
      headerValues: [
        'id',
        'title',
        'description',
        'body',
        'image',
        'category',
        'authorId',
        'authorName',
        'authorAvatar',
        'createdAt',
      ],
    });
  }

  articlesSheetCache = sheet;
  return sheet;
}

let likesSheetCache = null;
let commentsSheetCache = null;

export async function getLikesSheet() {
  if (likesSheetCache) return likesSheetCache;

  await doc.loadInfo();

  let sheet = doc.sheetsByTitle['Likes'];
  if (!sheet) {
    sheet = await doc.addSheet({
      title: 'Likes',
      headerValues: ['id', 'articleId', 'userId', 'createdAt'],
    });
  }

  likesSheetCache = sheet;
  return sheet;
}

export async function getCommentsSheet() {
  if (commentsSheetCache) return commentsSheetCache;

  await doc.loadInfo();

  let sheet = doc.sheetsByTitle['Comments'];
  if (!sheet) {
    sheet = await doc.addSheet({
      title: 'Comments',
      headerValues: ['id', 'articleId', 'authorId', 'authorName', 'authorAvatar', 'text', 'createdAt'],
    });
  }

  commentsSheetCache = sheet;
  return sheet;
}