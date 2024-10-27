// routes/userRoutes.js
const express = require('express');
const {User} = require('../src/schema/cprSchema');
const userRouter = express.Router();

// Get all users (GET request)
/**
 * @swagger
 * /api/user:
 */
userRouter.get('/api/user', async (req, res) => {
  try {
    const users = await User.find(); // Find all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific user by name (GET request)
/**
 * @swagger
 * /api/user/{username}:
 */
userRouter.get('/api/user/:username', async (req, res) => {
  try {
    const name = req.params.username.toLowerCase(); // Get name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const user = await User.findOne({ username: { $regex: regex }});  // Find user by name
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a user (POST request)
/**
 * @swagger
 * /api/user:
 */
userRouter.post('/api/user', async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address
  });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update a user by name (PUT request)
/**
 * @swagger
 * /api/user/{username}:
 */
userRouter.put('/api/user/:username', async (req, res) => {
  try {
    const name = req.params.username.toLowerCase(); // Get name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const user = await User.findOne({ username: { $regex: regex }});  // Find user by name
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.username = req.body.username;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.status = req.body.status;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a user by name (DELETE request)
/**
 * @swagger
 * /api/user/{username}:
 */
userRouter.delete('/api/user/:username', async (req, res) => {
  try {
    const name = req.params.username.toLowerCase(); // Get name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const user = await User.findOne({ username: { $regex: regex }});  // Find user by name
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.deleteOne({ username: { $regex: regex }}); //Delete user by name
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;
