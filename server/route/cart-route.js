// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart-controller');

router.post('/create', cartController.createCart);

// Add item to cart
router.post('/add', cartController.addItemToCart);

// Get cart by user ID
router.get('/:userId', cartController.getCartByUserId);

// Update cart item quantity
router.put('/update', cartController.updateCartItemQuantity);

router.put("/:userId", cartController.updateCart);

// Remove item from cart
router.delete('/:userId/:productId', cartController.removeItemFromCart);

// Clear cart
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
