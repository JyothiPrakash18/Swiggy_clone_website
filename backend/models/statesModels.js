const mongoose = require('mongoose');

const statesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter states Name"],
        trim: true,
        maxLength: [100, "states name cannot exceed 100 characters"]
    },
    stateCode : {
        type: String,
        required: true
    },
    status : {
        type : String,
        default : "Active"
    },
    deletedAt : {
        type: Date,
        default: null
    } 
},{timestamps : true});

let schema = mongoose.model("states", statesSchema);
module.exports = schema;