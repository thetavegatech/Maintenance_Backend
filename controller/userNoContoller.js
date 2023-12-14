const express = require('express');
const routerNo = express.Router();
const UserNo = require('../NumberModel');

// Create a new user
routerNo.post('/UserNo', async (req, res) => {
  try {
    const { name, phoneNumber, address, email } = req.body;
    const newUserNo = new UserNo({ name, phoneNumber, address, email });
    const userno = await newUserNo.save();
    res.json(userno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get a list of all users
routerNo.get('/UserNo', async (req, res) => {
  try {
    const usernos = await UserNo.find();
    res.json(usernos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

  // Get user by ID
  routerNo.get('/UserNo/:userId', async (req, res) => {
    try {
      const userno = await UserNo.findById(req.params.userId);
      if (!userno) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userno);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  });

  // Update user by ID
  routerNo.put('/UserNo/:userId', async (req, res) => {
    try {
      const userno = await UserNo.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!userno) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userno);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  });

// Delete user by ID
routerNo.delete('/UserNo/:userId', async (req, res) => {
  try {
    const userno = await UserNo.findByIdAndRemove(req.params.userId);
    if (!userno) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userno);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = routerNo;
