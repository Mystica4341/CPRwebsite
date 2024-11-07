const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../src/schema/cprSchema');
const crypto = require('crypto');
const router = express.Router();

// Login route
router.post('/api/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    //Validate username and password
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    } else if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    } 

    //Encode token
    const Key = crypto.randomBytes(64).toString('hex');
    console.log(Key);

    // If the username and password are valid, generate a JWT token
    const token = jwt.sign({ username: user.username, email: user.email, role: user.role }, Key, { expiresIn: '1h' });

    // Send the token as a response
    return res.status(200).json({ 
      userData: user,
      token: token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Logout route
router.post('/api/logout', (req, res) => {
  // Add your own logic to handle logout

  // Send a success message as a response
  res.json({ message: 'Logout successful' });
});

module.exports = router;