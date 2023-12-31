// controllers/assetController.js
const AssetMaster = require('../models/AssetModel');

// Create a new asset
exports.createAsset = async (req, res) => {
  try {
    const newAsset = new AssetMaster(req.body);
    const savedAsset = await newAsset.save();
    res.status(201).json(savedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await AssetMaster.find();
    res.status(200).json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get asset by ID
exports.getAssetById = async (req, res) => {
  try {
    const asset = await AssetMaster.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update asset by ID
exports.updateAssetById = async (req, res) => {
  try {
    const updatedAsset = await AssetMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete asset by ID
exports.deleteAssetById = async (req, res) => {
  try {
    const deletedAsset = await AssetMaster.findByIdAndDelete(req.params.id);
    if (!deletedAsset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(deletedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
