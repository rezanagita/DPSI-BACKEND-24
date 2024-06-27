const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(`Registering user: ${username}, Plain Password: ${password}, Hashed Password: ${hashedPassword}`);
    const newUser = await User.create({ username, password: hashedPassword, role });
    res.status(201).json(newUser);

    // Coba verifikasi password yang baru di-hash
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    console.log(`Password match verification after registration: ${passwordMatch}`);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
});



// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Ensure JWT_SECRET is defined in your environment variables
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error in /login route:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
