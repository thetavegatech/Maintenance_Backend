
const express = require('express');
const router = express()

const { saveAsset, getAllData , getId, updateRecord, deleteRecord,updateRecords, getMachines} = require('../controller/Controller'); // Assuming the controller file is named `Controller.js` and is in a directory called `controller`
// const {saveBreakDown, saveBreakdown }= require('../controller/BreakdownController');

router.post('/saveAsset', saveAsset);
router.get('/getAllData',getAllData);
router.get('/getId/:id',getId);
router.put('/updateRecord/:id',updateRecord);
router.delete('/deleteRecord/:id',deleteRecord);
router.put('/updateRecords',updateRecords);
router.get('/getMachines/:AssetName', getMachines);

// router.post('/saveBreakDown', saveBreakdown);

module.exports = router;


















































// const express = require("express");
// const Task = require("../model/TaskModel");
// const { createTask, getTasks , getTask , deleteTask , updateTask} = require("../controller/taskController");
// const router = express.Router()




// router.post("/api/tasks", createTask)
// router.get("/api/tasks", getTasks)
// router.get("/api/tasks/:id", getTask)
// router.delete("/api/tasks/:id", deleteTask)
// router.put("/api/tasks/:id", updateTask)
// module.exports = router;