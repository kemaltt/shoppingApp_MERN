import express from 'express';
import { upload } from '../services/file-upload.service.js';

const router = express.Router();

router.post('/upload-images/:id', upload.array('productImages', 10), (req, res) => {
  const files = req.files?.map((file) => {
    return {
      url: file.path,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    };
  });
  if (files === undefined) {
    res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json(files);
});

router.post('/upload-profile-image', upload.array('profile_image', 10), (req, res) => {
  const files = req.files?.map((file) => {
    return {
      url: file.path,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    };
  });
  if (files === undefined) {
    res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json(files);
});

export default router;