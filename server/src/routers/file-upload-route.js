import express from 'express';
import jwt from "jsonwebtoken";
import { upload, uploadToFirebase } from '../services/file-upload.service.js';

const router = express.Router();

router.post('/upload-images/:id', upload.array('productImages', 10), async (req, res) => {
  try {
    // Token'dan kullanıcı ID'sini al
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(200).json([]);
    }

    const uploadedFiles = await Promise.all(
      files.map((file) => uploadToFirebase(file, "productImages", id, userId))
    );

    res.status(200).json(uploadedFiles);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file:", error });
  }
  // const files = req.files?.map((file) => {
  //   return {
  //     url: file.path,
  //     filename: file.filename,
  //     originalname: file.originalname,
  //     mimetype: file.mimetype,
  //     size: file.size
  //   };
  // });
  // if (files === undefined) {
  //   res.status(400).json({ message: "No file uploaded" });
  // }
  // res.status(200).json(files);
});

router.post('/upload-profile-image', upload.single('profile_image'), async (req, res) => {
  try {
    // Token'dan kullanıcı ID'sini al
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const file = req.file;
    
    if (!file) {
      return res.status(200).json([]);
    }
    const uploadedFile = await uploadToFirebase(file, "profile_image", null, userId);
    res.status(200).json(uploadedFile);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file:", error });
  }
  // const files = req.files?.map((file) => {
  //   return {
  //     url: file.path,
  //     filename: file.filename,
  //     originalname: file.originalname,
  //     mimetype: file.mimetype,
  //     size: file.size
  //   };
  // });
  // if (files === undefined) {
  //   res.status(400).json({ message: "No file uploaded" });
  // }
  // res.status(200).json(files);
});

export default router;