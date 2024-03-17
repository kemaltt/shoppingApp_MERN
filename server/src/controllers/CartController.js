import CartModel from "../models/CartModel.js";

export const getCart = async (req, res) => {
  const user_id = req.user.id;
  console.log(user_id);

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
  console.log(req.body);
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