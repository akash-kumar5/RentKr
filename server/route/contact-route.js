const express = require("express");
const router = express.Router();
const contactForm = require("../controller/contact-controller.js")

router.route('/contact').post(contactForm);


module.exports = router;