import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";

export const getCart = async (req, res) => {
  const user_id = req.user.id;

  try {
    const cart = await CartModel.findOne({ user_id: user_id }).populate('products.product');
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "There are no items in the cart"
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addToCart = async (req, res) => {
  const user_id = req.user.id;
  const { _id, quantity, price } = req.body;
  console.log(req.body);

  try {
    const cart = await CartModel.findOne({ user_id });

    if (!cart) {
      const newCart = new CartModel({ user_id, products: [{ product: _id, quantity, price }] });
      await newCart.save();
      const newCartt = await CartModel.findOne({ user_id: user_id }).populate('products.product');

      return res.status(201).json(newCartt);
    }

    const product = cart.products.find(p => p.product == _id);
    if (product) {
      product.countInStock += countInStock;
      await cart.save();
      const newCart = await CartModel.findOne({ user_id: user_id }).populate('products.product');

      return res.status(200).json(newCart);
    }

    cart.products.push({ product: _id, quantity, price });
    await cart.save();
    const newCart = await CartModel.findOne({ user_id: user_id }).populate('products.product');

    res.status(200).json(newCart);
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

    const product = cart.products.find(p => p.product == product_id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found"
      });
    }
    cart.products = cart.products.filter(p => p.product != product_id);
    await cart.save();
    const newCart = await CartModel.findOne({ user_id: user_id }).populate('products.product');

    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const updateCartById = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  const { quantity, price, updatedCountInStock } = req.body;
  try {
    const cart = await CartModel.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found"
      });
    }

    const product = cart.products.find(p => p.product.toString() === id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found"
      });
    }
    if (quantity) product.quantity = quantity;
    if (price) product.price = price;
    await cart.save();
    
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, { countInStock: updatedCountInStock }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    const newCart = await CartModel.findOne({ user_id: user_id }).populate('products.product');

    res.status(200).json(newCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}