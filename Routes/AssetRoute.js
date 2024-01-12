
// routes/assetRoutes.js
const express = require('express');
const router = express.Router();
const assetController = require('../controller/AssetController');

// Create a new asset
router.post('/assets', assetController.createAsset);

// Get all assets
router.get('/assets', assetController.getAllAssets);

// Get asset by ID
router.get('/assets/:id', assetController.getAssetById);

// Update asset by ID
router.put('/assets/:id', assetController.updateAssetById);

// Delete asset by ID
router.delete('/assets/:id', assetController.deleteAssetById);

// Get all unique locations of assets
router.get('/locations', assetController.getAllLocations);

module.exports = router;
