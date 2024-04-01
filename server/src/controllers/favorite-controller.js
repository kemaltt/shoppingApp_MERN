import UserModel from "../models/UserModel.js";

export const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const foundProduct = await UserModel.findById(userId).populate('favorite');
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(foundProduct.favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addFavorite = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (foundUser.favorite.includes(productId)) {
      return res.status(400).json({ message: "Product already in favorites" });
    }
    foundUser.favorite.push(productId)
    await foundUser.save();
    const newUser = await UserModel.findById(userId).populate('favorite');
    res.status(200).json(newUser.favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteFavorite = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.favorite = user.favorite.filter(fav => fav != productId);
    await user.save();
    const newUser = await UserModel.findById(userId).populate('favorite');
    res.status(200).json(newUser.favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}