import CartModel from "../models/CartModel.js";

export const getCart = async (req, res) => {
  const user_id = '65dbad52da17b2a8460126fc';

  try {
    const cart = await CartModel.findOne({ user_id: user_id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addToCart = async (req, res) => {
  const { product_id, quantity, price } = req.body;
  // const user_id = req.user._id;
  const user_id = '65dbad52da17b2a8460126fc';
  try {
    const cart = await CartModel.findOne({ user_id });
    if (!cart) {
      const newCart = new CartModel({ user_id, products: [{ product_id, quantity, price }] });
      await newCart.save();
      return res.status(201).json(newCart);
    }
    const product = cart.products.find(p => p.product_id == product_id);
    if (product) {
      product.quantity += quantity;
      await cart.save();
      return res.status(200).json(cart);
    }
    cart.products.push({ product_id, quantity, price });
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}