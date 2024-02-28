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

// Get all assets with distinct locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await AssetMaster.distinct('location');
    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update maintenance set by asset ID and set ID
exports.updateMaintenanceSetById = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const setId = req.params.setId;

    const asset = await AssetMaster.findById(assetId);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // Find the index of the maintenance set with the given ID
    const setIndex = asset.maintenanceData.findIndex((set) => set._id.toString() === setId);

    if (setIndex === -1) {
      return res.status(404).json({ error: 'Maintenance set not found' });
    }

    // Update the maintenance set properties
    const updatedSet = Object.assign(asset.maintenanceData[setIndex], req.body);

    // Save the changes
    const updatedAsset = await asset.save();

    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// // Get maintenance set by asset ID and set ID
// exports.getMaintenanceSetById = async (req, res) => {
//   try {
//     const assetId = req.params.assetId;
//     const setId = req.params.setId;

//     const asset = await AssetMaster.findById(assetId);

//     if (!asset) {
//       return res.status(404).json({ error: 'Asset not found' });
//     }

//     // Find the maintenance set with the given ID
//     const maintenanceSet = asset.maintenanceData.find((set) => set._id.toString() === setId);

//     if (!maintenanceSet) {
//       return res.status(404).json({ error: 'Maintenance set not found' });
//     }

//     res.status(200).json(maintenanceSet);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// In your controller, access the parameters from req.params
exports.getMaintenanceSetById = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const setId = req.params.setId;
    const asset = await AssetMaster.findById(assetId);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // Find the maintenance set with the given ID
    const maintenanceSet = asset.maintenanceData.find((set) => set._id.toString() === setId);

    if (!maintenanceSet) {
      return res.status(404).json({ error: 'Maintenance set not found' });
    }

    res.status(200).json(maintenanceSet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete maintenance data set by asset ID
exports.deleteMaintenanceSetById = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const setId = req.params.setId;

    const asset = await AssetMaster.findById(assetId);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // Find the index of the maintenance set with the given ID
    const setIndex = asset.maintenanceData.findIndex((set) => set._id.toString() === setId);

    if (setIndex === -1) {
      return res.status(404).json({ error: 'Maintenance set not found' });
    }

    // Remove the maintenance set from the array
    asset.maintenanceData.splice(setIndex, 1);

    const updatedAsset = await asset.save();

    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getLocationByAssetName = async (req, res) => {
  try {
    const assets = await AssetMaster.find({}, { AssetName: 1, Location: 1, _id: 0 });

    if (!assets || assets.length === 0) {
      return res.status(404).json({ error: 'No assets found' });
    }

    const assetNamesAndLocations = assets.map(({ AssetName, Location }) => ({ AssetName, Location }));

    res.status(200).json(assetNamesAndLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
