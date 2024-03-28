const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("By controller");
  } catch (error) {}
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).send({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      res.status(401).json({ message: "Invalid Credentials" });
    }

    const validPass = await userExist.checkPass(password);

    if (validPass) {
      res.status(201).send({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        isAdmin: userExist.isAdmin.toString()
      });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    // Fetch user profile based on the logged-in user's ID (assuming it's stored in req.user)
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }
    // Return user profile data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update user profile
const updateUserProfile = async (req, res) => {
  try {
    const {userId} = req.body;
    // Update user profile based on the logged-in user's ID (assuming it's stored in req.user)
    const updatedUser = await User.findOneAndUpdate(
      userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User profile not found" });
    }
    // Return updated user profile data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserProfiles = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    // Return user profile data
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    res.status(500).json({ message: "Internal server error" });
  }  
};

const makeAdmin = async (req, res) =>{
  try {
    const { userId } = req.params;
    // Find the user by ID and update their isAdmin field to true
    const user = await User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('Error making user admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { home, register, login, updateUserProfile, getUserProfile, getUserProfiles, makeAdmin };
