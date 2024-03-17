import CartModel from "../models/CartModel.js";

export const getCart = async (req, res) => {
  const user_id = req.user.id;

  try {
    const cart = await CartModel.findOne({ user_id: user_id });
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found"
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addToCart = async (req, res) => {
  const { _id, countInStock, price } = req.body;
  const user_id = req.user.id;

  try {
    const cart = await CartModel.findOne({ user_id });
    if (!cart) {
      const newCart = new CartModel({ user_id, products: [{ product_id: _id, countInStock, price }] });
      await newCart.save();
      return res.status(201).json(newCart);
    }
    const product = cart.products.find(p => p.product_id == _id);
    if (product) {
      product.countInStock += countInStock;
      await cart.save();
      return res.status(200).json(cart);
    }
    cart.products.push({ product_id: _id, countInStock, price });
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const removeFromCart = async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.params.id;
  try {
    const cart = await CartModel.findOne({
      user_id
    });
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found"
      });
    }
    const product = cart.products.find(p => p.product_id == product_id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found"
      });
    }
    cart.products = cart.products.filter(p => p.product_id != product_id);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}