const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add product to cart
exports.addToCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  try {
    const productExists = await Product.findById(productId);
    if (!productExists) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex((p) => p.productId == productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Update product quantity in cart
exports.updateCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const productIndex = cart.products.findIndex((p) => p.productId == productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    next(error);
  }
};

// Delete product from cart
exports.deleteFromCart = async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = cart.products.filter((p) => p.productId != productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Get cart details and total price
exports.getCart = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const totalPrice = cart.products.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    res.status(200).json({ cart, totalPrice });
  } catch (error) {
    next(error);
  }
};
