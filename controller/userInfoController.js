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

// Find users by location
routerNo.get('/UserInfoByLocation/:Location', async (req, res) => {
  try {
    const Location = req.params.Location;
    const usersByLocation = await UserInfo.find({ Location });
    
    if (usersByLocation.length === 0) {
      return res.status(404).json({ error: 'No users found in the specified location' });
    }

    res.json(usersByLocation);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users by location' });
  }
});

// getLocationByAssetName = async (req, res) => {
  routerNo.get('/UserInfoByLocation', async (req, res) => {
  try {
    const users = await UserInfo.find({}, { Location: 1, name: 1, phoneNumber: 1, _id: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No location found' });
    }

    const assetNamesAndLocations = users.map(({ Location, name, phoneNumber }) => ({ Location, name, phoneNumber }));

    res.status(200).json(assetNamesAndLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

routerNo.get('/UserInfoByLocation/:location', async (req, res) => {
  try {
    const locationParam = req.params.location;

    const users = await UserInfo.find({ Location: locationParam }, { name: 1, phoneNumber: 1, _id: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found for the specified location' });
    }

    const usersInfo = users.map(({ name, phoneNumber }) => ({ name, phoneNumber }));

    res.status(200).json(usersInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = routerNo;
