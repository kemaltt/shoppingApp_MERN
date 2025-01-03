import express from 'express';
import jwt from "jsonwebtoken";
import { deleteFromFirebase, upload, uploadToFirebase } from '../services/file-upload.service.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/upload-images/:id', upload.array('productImages', 10), verifyToken, async (req, res) => {
  try {

    const userId = req.user.id;

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

router.post('/upload-profile-image', upload.single('profile_image'), verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

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

router.delete('/delete-image', verifyToken, async (req, res) => {
  try {
    const { fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ message: "File URL is required" });
    }

    // Delete images from Firebase
    if (Array.isArray(fileUrl)) {
      // fileUrl bir dizi ise
      await Promise.all(
        fileUrl.map((image) => deleteFromFirebase(image.url || image)) // image.url ya da direkt image olabilir
      );
    } else {
      // fileUrl tek bir URL ise
      await deleteFromFirebase(fileUrl);
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Error deleting file:", error });
  }
});

export default router;