// routes/userRoutes.js
const express = require('express');
const {User} = require('../src/schema/cprSchema');
const { modelNames } = require('mongoose');
const userRouter = express.Router();

// Get all users (GET request)
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns all Users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A successful response
 */
userRouter.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific user by name (GET request)
/**
 * @swagger
 * /api/users/{name}:
 *   get:
 *     summary: Returns a specific User by name
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: name
 *         required: false
 *         description: The name of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
userRouter.get('/api/users/:name', async (req, res) => {
  try {
    const name = req.params.name.toLowerCase(); // Retrieve name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const user = await User.findOne({ username: { $regex: regex }});  // Retrieve user by name
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = userRouter;
