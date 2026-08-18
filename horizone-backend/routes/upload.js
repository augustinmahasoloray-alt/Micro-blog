import express from 'express';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

/**
 * The frontend calls this first to get a short-lived, signed set of
 * parameters, then uploads the file DIRECTLY to Cloudinary using them.
 * This keeps the file off our server and keeps the API secret off the
 * frontend, while still controlling exactly what can be uploaded (folder,
 * expiry via timestamp, etc).
 */
router.get('/signature', (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = 'horizone-avatars';

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
});

export default router;