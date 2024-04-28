// controllers/orderController.js

const Order = require("../models/order-model");
const nodemailer = require("nodemailer")

// Controller function for creating a new order
const createOrder = async (req, res) => {
  try {
    // Extract order data from the request body
    const {
      userId,
      deliveryMethod,
      paymentMethod,
      deliveryDetails,
      totalPrice,
      products,
      status /* Add other order details here */,
    } = req.body;

    // Create a new order object
    const order = new Order({
      userId,
      deliveryMethod,
      paymentMethod,
      deliveryDetails,
      totalPrice,
      products,
      status
      /* Add other order details here */
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function for getting order details by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Fetch the order from the database by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const viewAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Send the orders as a response
    res.status(200).json(orders);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const viewOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch orders from the database for the specified user ID
    const orders = await Order.find({ userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by user ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sendOrderConfirmationEmail = async (orderData) => {
  try {
    // Create a transporter using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your_smtp_username',
        pass: 'your_smtp_password'
      }
    });

    // Construct email message
    let mailOptions = {
      from: 'your_email@example.com',
      to: orderData.email, // Assuming orderData contains the customer's email address
      subject: 'Order Confirmation',
      text: `Dear ${orderData.name},\n\nYour order (${orderData.orderId}) has been successfully placed.`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Order confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error; // Handle the error in the calling function
  }
};


module.exports = {
  createOrder,
  getOrderById,
  viewAllOrders,
  updateOrderStatus,
  viewOrdersByUserId,
  sendOrderConfirmationEmail
};
