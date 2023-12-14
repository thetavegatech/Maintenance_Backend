const Asset = require('../Model'); // Assuming the model file is named `Asset.js` and is in a directory called `models`

const saveAsset = async (req, res) => {
    const {  AssetName, Description, AssetCategory, Location,
        ManufacturersName, ManufacturersAddress, 
        ManufacturersContactNo, ManufacturersEmail,
      ModelNumber,SerialNumber,  PurchaseDate,
       WarrantyStartDate,
      WarrantyEndDate, PurchaseCost, AcquisitionMethod,
      WarrantyProviderManufacturerContact, 
      WarrantyTermsandConditions, SupplierVendorInformation, 
      CurrentOwner,DepartmentResponsible,LocationDepartment,
      PhysicalLocation, CurrentStatus, ExpectedUsefulLife,
      DateofLastMaintenance,
      DetailsofMaintenanceActivities, 
       ScheduledMaintenanceDatesandIntervals,PMDetails,StartDateofMaintenance,
       nextMaintenanceDate,  startDate ,nextDate, status, TaskName, TaskDescription} = req.body;
 
    try {
        const newAsset = new Asset({
           
            AssetName,
            Description,
            AssetCategory,
            Location,
           ManufacturersName ,
            ManufacturersAddress,
            ManufacturersContactNo,
            ManufacturersEmail,
            ModelNumber,
            SerialNumber,
            PurchaseDate,
            WarrantyStartDate,
            WarrantyEndDate,
            PurchaseCost,
            AcquisitionMethod,
            WarrantyProviderManufacturerContact,
            WarrantyTermsandConditions,
            SupplierVendorInformation,
            CurrentOwner,DepartmentResponsible,LocationDepartment,
            PhysicalLocation, CurrentStatus, ExpectedUsefulLife,
            DateofLastMaintenance,
            DetailsofMaintenanceActivities,  ScheduledMaintenanceDatesandIntervals,PMDetails,
            StartDateofMaintenance, nextMaintenanceDate, startDate ,nextDate,status,TaskName,
            TaskDescription


        });

        await newAsset.save();

        res.status(201).json({ message: 'Asset saved successfully', data: newAsset });
    } catch (error) {
        console.error('Error saving asset:', error);
        res.status(500).json({ message: 'Error saving asset' });
    }
};

const getMachines = async (req, res) => {
  const MachineName = req.params.AssetName;

  try {
    // Find the breakdown with the specified machineName
    const asset = await Asset.findOne({ AssetName });

    if (!asset) {
      return res.status(404).send("Machine not found");
    }

    res.send(asset);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllData = async (req, res) => {
    try {
      const assets = await Asset.find({});
      res.send(assets);
  } catch (err) {
      res.status(500).send(err);
  }
  };


  // app.get('/asset/:id', async (req, res) => {
    const getId = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        // this.setState({ assets: [response.data] });

        if (!asset) return res.status(404).send();
        res.send(asset);
    } catch (err) {
        res.status(500).send(err);
        
    }
};


// app.put('/asset/:id', async (req, res) => {
  const updateRecord = async (req, res) => {
  try {
      const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!asset) return res.status(404).send();
      res.send(asset);
  } catch (err) {
      res.status(500).send(err);
  }
};

const updateRecords =  async (req, res) => {
    try {
      // Assuming you are sending an array of assets in the request body
      const updatedAssets = req.body.assets;
  
      // Update each asset in the database
      for (const updatedAsset of updatedAssets) {
        // Find the asset by ID and update it
        const filter = { _id: updatedAsset._id };
        const update = {
          nextDate: updatedAsset.nextDate,
          // Add other fields to update here if needed
        };
  
        // Use Mongoose's findOneAndUpdate to update the asset
        await Asset.findOneAndUpdate(filter, update);
      }
  
      res.json({ message: 'Records updated successfully' });
    } catch (error) {
      console.error('Error updating records:', error);
      res.status(500).json({ error: 'Error updating records' });
    }
  };

// app.delete('/asset/:id', async (req, res) => {
  const deleteRecord = async (req, res) => {
  try {
      const asset = await Asset.findByIdAndDelete(req.params.id);
      if (!asset) return res.status(404).send();
      res.send(asset);
  } catch (err) {
      res.status(500).send(err);
  }
};


module.exports = {
    saveAsset,
    getAllData,
    getId,
    updateRecord,
    deleteRecord,
    updateRecords, 
    getMachines
};
