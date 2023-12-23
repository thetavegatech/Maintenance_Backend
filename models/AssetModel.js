// const moment = require('moment-timezone');
const mongoose = require("mongoose")

const Schema = mongoose.Schema;
// const now = new Date();

const AssetSchema = new Schema({
  
    AssetName: {
        type: String,
        require: true
    },
    MachineNo: {
        type: String,
        require: true
    },
    SrNo: {
        type: Number,
        require: true
    },
    MachineType: {
        type: String,
        require: true
    },
    Make: {
        type: String,
        require: true
    },
    Controller: {
        type: String,
        require: true
    },
    PowerRatting: {
        type: String,
        require: true
    },
    CapecitySpindle: {
        type: String,
        require: true
    },
    AxisTravels: {
        type: String,
        require: true
    },
    Ranking: {
        type: String,
        require: true
    }, 
    Location: {
        type:String,
        require: true
    },
    InstallationDate: {
        type: String,
       
    },
    ManufacturingYear: {
        type: String,
       
    },
    Image: {
        type: String,
        require: true      
    },
        status :{
            type:String,
            reruire: true
        },

    },

);

const AssetMaster = mongoose.model('AssetMaster' , AssetSchema)


module.exports = AssetMaster;


