const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res, next) => {
  const { name, price, description } = req.body;
  try {
    if (!name || !price || !description) {
      return res.status(400).json({ message: 'All fields are required: name, price, description' });
    }

    const product = new Product({ name, price, description });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
// Fetch all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
