const express = require('express');
const {
  addToCart,
  updateCart,
  deleteFromCart,
  getCart,
} = require('../controllers/cart');

const router = express.Router();

router.post('/cart', addToCart);
router.put('/cart', updateCart);
router.delete('/cart', deleteFromCart);
router.get('/cart/:userId', getCart);

module.exports = router;
