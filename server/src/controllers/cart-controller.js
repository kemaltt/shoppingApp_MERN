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

// export const addToCart = async (req, res) => {
//   const user_id = req.user.id;
//   const { _id, quantity, price } = req.body;

//   try {
//     const cart = await CartModel.findOne({ user_id });

//     if (!cart) {
//       const newCart = new CartModel({ user_id, products: [{ product: _id, quantity, price }] });
//       await newCart.save();

//       const newCartt = await CartModel.findOne({ user_id: user_id }).populate('products.product');
//       return res.status(201).json(newCartt);
//     }

//     const product = cart.products.find(p => p.product == _id);
//     if (product) {
//       product.countInStock += countInStock;
//       await cart.save();
//       const newCart = await CartModel.findOne({ user_id: user_id }).populate('products.product');

//       return res.status(200).json(newCart);
//     }

//     cart.products.push({ product: _id, quantity, price });
//     await cart.save();
//     const newCart = await CartModel.findOne({ user_id: user_id }).populate('products.product');

//     res.status(200).json(newCart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

export const addToCart = async (req, res) => {
  const user_id = req.user.id;
  const { _id, quantity, price } = req.body;

  try {
    // Kontrol: İlgili ürünün stokta yeterli miktarda bulunup bulunmadığını kontrol edin
    const product = await ProductModel.findById(_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.countInStock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Sepeti kontrol et: Kullanıcının zaten bir sepeti var mı?
    let cart = await CartModel.findOne({ user_id });

    if (!cart) {
      // Yeni sepet oluştur ve ürünü ekle
      const newCart = new CartModel({
        user_id,
        products: [{ product: _id, quantity, price }],
      });
      await newCart.save();

      // Stok güncelleme
      product.countInStock -= quantity;
      await product.save();

      // Yeni sepeti döndür
      const populatedCart = await CartModel.findOne({ user_id }).populate("products.product");
      return res.status(201).json(populatedCart);
    }

    // Sepette ürün var mı kontrol et
    const existingProduct = cart.products.find((p) => p.product == _id);
    if (existingProduct) {
      // Ürün zaten varsa, miktarı artır
      if (product.countInStock < existingProduct.quantity + quantity) {
        return res.status(400).json({ message: "Not enough stock available to increase quantity" });
      }
      existingProduct.quantity += quantity;
    } else {
      // Ürün yoksa, yeni bir ürün olarak ekle
      cart.products.push({ product: _id, quantity, price });
    }

    // Stok güncelleme
    product.countInStock -= quantity;
    await product.save();

    // Sepeti kaydet ve döndür
    await cart.save();
    const populatedCart = await CartModel.findOne({ user_id }).populate("products.product");
    return res.status(200).json(populatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const removeFromCart = async (req, res) => {
//   const user_id = req.user.id;
//   const product_id = req.params.id;

//   try {
//     const cart = await CartModel.findOne({
//       user_id
//     });
//     if (!cart) {
//       return res.status(404).json({
//         status: "error",
//         message: "Cart not found"
//       });
//     }

//     const product = cart.products.find(p => p.product == product_id);
//     if (!product) {
//       return res.status(404).json({
//         status: "error",
//         message: "Product not found"
//       });
//     }
//     cart.products = cart.products.filter(p => p.product != product_id);
//     await cart.save();
//     const newCart = await CartModel.findOne({ user_id: user_id }).populate('products.product');

//     res.status(200).json(newCart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

// }
export const removeFromCart = async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.params.id;

  try {
    // Kullanıcının sepetini kontrol et
    const cart = await CartModel.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found",
      });
    }

    // Sepette ürün var mı kontrol et
    const product = cart.products.find((p) => p.product == product_id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found in cart",
      });
    }

    // Ürünü karttan kaldır
    cart.products = cart.products.filter((p) => p.product != product_id);
    await cart.save();

    // Stok miktarını güncelle
    const productInDb = await ProductModel.findById(product_id);
    if (productInDb) {
      productInDb.countInStock += product.quantity;
      await productInDb.save();
    }

    // Güncellenmiş sepeti döndür
    const updatedCart = await CartModel.findOne({ user_id }).populate("products.product");
    return res.status(200).json(updatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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