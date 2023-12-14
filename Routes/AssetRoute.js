
// const express = require('express');
// const AssetRouter = express()

// const { saveAssetData,
//     getAssetData,
//     getAssetId,
//     updateAssetRecord,
//     deleteAssetRecord,
//     updateAssetRecords, 
//     getAllAsset } = require('../controller/AssetController'); // Assuming the controller file is named `Controller.js` and is in a directory called `controller`
// // const {saveBreakDown, saveBreakdown }= require('../controller/BreakdownController');

// AssetRouter.post('/saveAssetData', saveAssetData);
// AssetRouter.get('/getAssetData',getAssetData);
// AssetRouter.get('/getAssetId/:id',getAssetId);
// AssetRouter.put('/updateAssetRecord/:id',updateAssetRecord);
// AssetRouter.delete('/deleteAssetRecord/:id',deleteAssetRecord);
// AssetRouter.post('/updateAssetRecords',updateAssetRecords);
// AssetRouter.get('/getAllAsset/:AssetName', getAllAsset);

// // router.post('/saveBreakDown', saveBreakdown);

// module.exports = AssetRouter;


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

module.exports = router;
