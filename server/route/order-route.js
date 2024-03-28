const express = require('express');
const router = express.Router();
const orderController = require("../controller/order-controller");

router.get('/', orderController.getOrder);

router.post('/add', orderController.postOrder)

router.put('/update/:orderId/status', orderController.updateOrder)

router.delete('/delete/:orderId', orderController.deleteOrder)

module.exports = router;