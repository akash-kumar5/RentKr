const Cart = require('../models/cart-model');

const cartMiddleware = async (req, res, next) => {
  const userId = req.user._id; // Assuming the user ID is available in the request object

  try {
    // Find the cart associated with the user ID
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    req.cart = cart; // Attach cart to request object
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = cartMiddleware;
