const express = require('express');
const routerNo = express.Router();
const UserInfo = require('../models/userInfoModel');

// Create a new user
routerNo.post('/UserInfo', async (req, res) => {
  try {
    const { name, phoneNumber, address, email, Location, plant } = req.body;
    const newUserNo = new UserInfo({ name, phoneNumber, address, email, Location, plant });
    const userno = await newUserNo.save();
    res.json(userno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get a list of all users
routerNo.get('/UserInfo', async (req, res) => {
  try {
    const usernos = await UserInfo.find();
    res.json(usernos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

  // Get user by ID
  routerNo.get('/UserInfo/:userId', async (req, res) => {
    try {
      const userno = await UserInfo.findById(req.params.userId);
      if (!userno) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userno);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  });

  // Update user by ID
  routerNo.put('/UserInfo/:userId', async (req, res) => {
    try {
      const userno = await UserInfo.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!userno) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userno);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  });

// Delete user by ID
routerNo.delete('/UserInfo/:userId', async (req, res) => {
  try {
    const userno = await UserInfo.findByIdAndRemove(req.params.userId);
    if (!userno) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userno);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = routerNo;
