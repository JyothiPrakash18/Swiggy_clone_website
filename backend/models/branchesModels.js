const mongoose = require('mongoose');
const validator = require('validator');

const branchesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter branch Name"],
        trim: true,
        maxLength: [100, "branch name cannot exceed 100 characters"]
    },
    address: {
        type: String,
        required : true,
        trim: true
    },
    p_mob: {
        type: String,
        required: true,
        trim: true
    },
    s_mob: {
        type: String,
        required: true,
        trim: true
    },
    stateId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'states'
    },
    status : {
        type : Number,
        default : 0
    },
    deletedAt : {
        type: Date,
        default: null
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid email address"]
    }
    
},{timestamps : true});

let schema = mongoose.model("branches", branchesSchema);
module.exports = schema;