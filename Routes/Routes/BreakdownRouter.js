const express = require('express');
const multer = require('multer');
const Breakdownrouter = express();

const { saveBreakdown, getBreakdownData, getBreakdownDataId, updateBreakdownRecord, deleteBreakdownRecord, getMachineNames  }= require('../controller/BreakdownController');


// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(D, 'uploads/'); // Specify the directory where files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(D, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

const upload = multer({ storage: storage });

Breakdownrouter.post('/saveBreakdown', saveBreakdown);
Breakdownrouter.get('/getBreakdownData', getBreakdownData);
Breakdownrouter.get('/getBreakdownDataId/:id',getBreakdownDataId);
Breakdownrouter.put('/updateBreakdownRecord/:id', upload.single('attachment'), updateBreakdownRecord);
Breakdownrouter.delete('/deleteBreakdownRecord/:id',deleteBreakdownRecord);
Breakdownrouter.post('/getMachineNames ',getMachineNames );
Breakdownrouter.get('/getMachineNames/:machineName', getMachineNames);

module.exports = Breakdownrouter;
