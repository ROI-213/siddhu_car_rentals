import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Persistent upload directory in public/uploads/vehicles
export const uploadDir = path.join(rootDir, 'public', 'uploads', 'vehicles');
export const distUploadDir = path.join(rootDir, 'dist', 'uploads', 'vehicles');

function ensureDirectories() {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // Also ensure dist folder has uploads folder if dist exists
    if (fs.existsSync(path.join(rootDir, 'dist')) && !fs.existsSync(distUploadDir)) {
      fs.mkdirSync(distUploadDir, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating upload directories:', err);
  }
}

ensureDirectories();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureDirectories();
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const originalExt = path.extname(file.originalname).toLowerCase();
    const ext = originalExt && ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(originalExt)
      ? originalExt
      : (file.mimetype === 'image/png' ? '.png' : file.mimetype === 'image/webp' ? '.webp' : '.jpg');
    
    const uniqueSuffix = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const filename = `vehicle_${uniqueSuffix}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image format. Allowed formats: JPEG, PNG, WebP, SVG.'), false);
  }
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/**
 * Handle multipart/form-data or Base64 JSON upload
 */
export async function handleImageUpload(req, res) {
  try {
    ensureDirectories();

    // 1. If uploaded via multer multipart/form-data
    if (req.file) {
      const filename = req.file.filename;
      const publicUrl = `/uploads/vehicles/${filename}`;

      // Sync copy to dist if dist exists
      try {
        if (fs.existsSync(path.join(rootDir, 'dist'))) {
          ensureDirectories();
          fs.copyFileSync(
            path.join(uploadDir, filename),
            path.join(distUploadDir, filename)
          );
        }
      } catch (copyErr) {
        console.warn('Could not copy upload to dist:', copyErr.message);
      }

      // Persist permanently into PostgreSQL
      try {
        const fileBuf = fs.readFileSync(path.join(uploadDir, filename));
        await db.saveUploadedImage(filename, req.file.mimetype, fileBuf);
      } catch (pgErr) {
        console.warn('PostgreSQL image upload error:', pgErr.message);
      }

      return res.json({
        success: true,
        message: 'Image uploaded successfully.',
        url: publicUrl,
        filename,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    }

    // 2. If uploaded via JSON Base64 ({ image: "data:image/...", filename: "..." })
    const base64Data = req.body?.image || req.body?.dataUrl;
    if (base64Data && typeof base64Data === 'string' && base64Data.startsWith('data:image/')) {
      const matches = base64Data.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ success: false, error: 'Invalid Base64 image format.' });
      }

      const mimeType = matches[1].toLowerCase();
      const rawBase64 = matches[2];
      const buffer = Buffer.from(rawBase64, 'base64');

      if (buffer.length > 10 * 1024 * 1024) {
        return res.status(400).json({ success: false, error: 'Image exceeds 10MB limit.' });
      }

      const ext = mimeType === 'png' ? '.png' : mimeType === 'webp' ? '.webp' : '.jpg';
      const uniqueSuffix = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
      const filename = `vehicle_${uniqueSuffix}${ext}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);

      // Copy to dist if dist exists
      try {
        if (fs.existsSync(path.join(rootDir, 'dist'))) {
          ensureDirectories();
          fs.writeFileSync(path.join(distUploadDir, filename), buffer);
        }
      } catch (e) {}

      // Persist permanently into PostgreSQL
      try {
        await db.saveUploadedImage(filename, `image/${mimeType}`, buffer);
      } catch (pgErr) {
        console.warn('PostgreSQL base64 image save error:', pgErr.message);
      }

      const publicUrl = `/uploads/vehicles/${filename}`;
      return res.json({
        success: true,
        message: 'Image uploaded and converted to permanent URL successfully.',
        url: publicUrl,
        filename,
        size: buffer.length
      });
    }

    return res.status(400).json({
      success: false,
      error: 'No image file or Base64 data provided in request.'
    });
  } catch (err) {
    console.error('handleImageUpload error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process image upload: ' + err.message
    });
  }
}
