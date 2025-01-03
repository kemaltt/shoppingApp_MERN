import ProductModel from "../models/ProductModel.js";
import { deleteFromFirebase, uploadToFirebase } from "../services/file-upload.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    if (!products) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {

  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  const userId = req.user.id;
  const newProduct = new ProductModel(product);

  try {

    const createdProduct = await newProduct.save();

    const files = req.files;

    if (files && files.length) {

      const productId = createdProduct._id.toString();

      const uploadedFiles = await Promise.all(
        files.map((file) => uploadToFirebase(file, "productImages", productId, userId))
      );
      console.log('uploadedFiles', uploadedFiles);

      await ProductModel.findByIdAndUpdate(productId, { images: uploadedFiles });
    }




    const products = await ProductModel.find({});
    if (!products) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(201).json(products);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {

  const { category } = req.query;
  try {
    if (category === 'All') {
      const products = await ProductModel.find({});
      if (!products) {
        return res.status(404).json({ message: "No product found" });
      }
      res.status(200).json(products);

    } else {
      const products = await ProductModel.where({ category: category });
      if (!products) {
        return res.status(404).json({ message: "No product found" });
      }
      res.status(200).json(products);
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update cart controller make sure to update the product countInStock
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { updatedCountInStock } = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, { countInStock: updatedCountInStock }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Edit product controller

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }

}

// Delete product controller
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Delete images from firebase
    if (deletedProduct.images && deletedProduct.images.length) {
      await Promise.all(
        deletedProduct.images.map((image) => deleteFromFirebase(image.url))
      );
    }

    res.status(200).json(deletedProduct);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}