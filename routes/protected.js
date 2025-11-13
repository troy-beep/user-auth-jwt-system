const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../config/db');

const router = express.Router();

// Protected route - Get user profile
router.get('/profile', authMiddleware, (req, res) => {
  try {
    const user = db.findUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error.'
    });
  }
});

// Protected route - Dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to your dashboard!',
    data: {
      user: {
        id: req.user.id,
        email: req.user.email
      },
      stats: {
        loginCount: 1,
        lastLogin: new Date()
      }
    }
  });
});

// Protected route - Update profile (example)
router.put('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Profile updated successfully.',
    data: {
      user: req.user
    }
  });
});

module.exports = router;
