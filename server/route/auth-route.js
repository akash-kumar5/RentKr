const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller")
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route('/').get(authController.home);

router.route('/register').post(validate(signupSchema),authController.register);

router.route('/login').post(authController.login);


router.route("/profile/:userId").get(authController.getUserProfile);


// Route to update user profile
router.put('/profile', authController.updateUserProfile);

router.get('/profiles', authController.getUserProfiles);

router.put('/profile/:userId/admin', authController.makeAdmin);

module.exports = router;