const mongoose = require('mongoose');

const chargesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Charges Name"],
        trim: true,
        maxLength: [100, "charges name cannot exceed 100 characters"]
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        default : null
    },
    percentage: {
        type: String,
        required: true
    },
    inclusive: {
        type: String,
        default : null
    },
    status : {
        type : Number,
        default : 0
    },
    deletedAt : {
        type: Date,
        default: null
    } 
},{timestamps : true});

let schema = mongoose.model("charges", chargesSchema);
module.exports = schema;