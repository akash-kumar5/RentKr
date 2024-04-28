const Cart = require('../models/cart-model');

const createCart = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    // Check if a cart already exists for the user
    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      return res.status(400).json({ message: 'Cart already exists for the user' });
    }

    // Create a new cart for the user
    const newCart = new Cart({ userId, items, totalAmount });
    await newCart.save();
    res.status(201).json(newCart); // Return the newly created cart
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const addItemToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, price } = req.body;

    let cart = await Cart.findOne({ userId });

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity and total price
      cart.items[existingItemIndex].quantity += quantity;
      cart.totalAmount += price * quantity;
    } else {
      // If the item doesn't exist in the cart, add it
      cart.items.push({ productId, quantity, price });
      cart.totalAmount += price * quantity;
    }

    await cart.save();

    res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(200).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    console.log("ck",item,item.productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (item && item.productId) { // Check if item and productId are defined
      item.quantity = quantity;
      await cart.save();
      res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } else {
      return res.status(404).json({ message: 'Invalid item data' });
    }
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const removeItemFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item with the specified productId
    const itemToRemove = cart.items.find(item => item.productId.toString() === productId);

    if (!itemToRemove) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Decrement the quantity of the item by one
    itemToRemove.quantity--;

    // If the quantity becomes 0, remove the item from the cart completely
    if (itemToRemove.quantity === 0) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    }

    // Calculate the new total amount
    cart.totalAmount -= itemToRemove.price;

    await cart.save();

    res.status(200).json({ message: 'One quantity of the item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items } = req.body;

    // Find the cart by userId and update its items
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports={addItemToCart, getCartByUserId, updateCartItemQuantity, clearCart, removeItemFromCart,updateCart, createCart};