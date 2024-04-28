// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/order-controller');

// Route for creating a new order
router.post('/add', orderController.createOrder);

router.get('/viewall',orderController.viewAllOrders);

router.get('/view/:userId', orderController.viewOrdersByUserId);

router.put('/:orderId/status', orderController.updateOrderStatus);

// Route for getting order details by ID
router.get('/:orderId', orderController.getOrderById);



module.exports = router;
