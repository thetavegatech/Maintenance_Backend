const BreakDown= require('../BreakdownModel');

const saveBreakdown = async (req, res) => {
    const {  MachineName,BreakdownStartDate,BreakdownEndDate,BreakdownStartTime,BreakdownEndTime,Shift,LineName,Operations,BreakdownPhenomenons,BreakdownType,OCC
        ,ActionTaken, Date,AttendedBy, WhyWhyAnalysis,RootCause,PreventiveAction,CorrectiveAction,whyWhyAnalysisList,TargetDate,Responsibility,HD,Remark,Status,Location,SpareParts,Cost
        } = req.body;
 
    try {
        const newBreakdown = new BreakDown({
           
            MachineName,BreakdownStartDate,BreakdownEndDate,BreakdownStartTime,BreakdownEndTime,Shift,LineName,Operations,BreakdownPhenomenons,
            BreakdownType,OCC,ActionTaken,Date, AttendedBy, WhyWhyAnalysis,RootCause,PreventiveAction,whyWhyAnalysisList,CorrectiveAction,TargetDate,Responsibility,
            SpareParts,HD,Remark,Status, Location,Cost
            // attachment: 'attachments/' + req.file.filename,

        });

        await newBreakdown.save();

        res.status(201).json({ message: 'Breakdown saved successfully', data: newBreakdown });
    } catch (error) {
        console.error('Error saving Brekdown:', error);
        res.status(500).json({ message: 'Error saving Breakdown' });
    }
};

const getBreakdownData = async (req, res) => {
   
    try {
      const breakdowns = await BreakDown.find({});
      res.send(breakdowns);
  } catch (err) {
      res.status(500).send(err);
  }
  };

  const getMachineNames = async (req, res) => {
    const MachineName = req.params.MachineName;
  
    try {
      // Find the breakdown with the specified machineName
      const machineDetails = await BreakDown.findOne({ MachineName });
  
      if (!machineDetails) {
        return res.status(404).send("Machine not found");
      }
  
      res.send(machineDetails);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const getBreakdownDataId = async (req, res) => {
    try {
        const breakdown = await BreakDown.findById(req.params.id);
        // this.setState({ assets: [response.data] });

        if (!breakdown) return res.status(404).send();
        res.send(breakdown);
    } catch (err) {
        res.status(500).send(err);
        
    }
};

const updateBreakdownRecord = async (req, res) => {
    try {
        // Check if a file is included in the request
        if (req.file) {
            // Assuming the file is saved in the 'uploads' directory
            req.body.attachment = req.file.path;
        }

        // Use the findByIdAndUpdate method with the new option to return the updated document
        const updatedBreakdown = await BreakDown.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBreakdown) {
            return res.status(404).send('Breakdown not found');
        }

        res.status(200).json(updatedBreakdown); // Send the updated breakdown as JSON
    } catch (err) {
        console.error('Error updating breakdown:', err);
        res.status(500).send('Internal Server Error');
    }
};

  const deleteBreakdownRecord = async (req, res) => {
    try {
        const breakdown = await BreakDown.findByIdAndDelete(req.params.id);
        if (!breakdown) return res.status(404).send();
        res.send(breakdown);
    } catch (err) {
        res.status(500).send(err);
    }
  };




module.exports = {
    saveBreakdown,
    getBreakdownData,
    getBreakdownDataId,
    updateBreakdownRecord,
    deleteBreakdownRecord,
    getMachineNames 
};
