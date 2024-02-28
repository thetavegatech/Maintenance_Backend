
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
router.get('/locations', assetController.getLocationByAssetName);

// Delete maintenance data set by asset ID
router.delete('/assets/:assetId/maintenance/:setId', assetController.deleteMaintenanceSetById);

// Update maintenance set by asset ID and set ID
router.put('/assets/:assetId/maintenance/:setId', assetController.updateMaintenanceSetById);

// Get maintenance set by asset ID and set ID
router.get('/assets/:assetId/maintenance/:setId', assetController.getMaintenanceSetById);


module.exports = router;
