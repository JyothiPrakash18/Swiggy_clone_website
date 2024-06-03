const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter customers Name"],
        trim: true,
        maxLength: [100, "customers name cannot exceed 100 characters"]
    },
    mob: {
        type: Number,
        required: [true, 'Please enter Mobile No'],
        unique: true,
        maxlength: [10, "Mobile No Should be 10 numbers"]
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true
    },
    otp : {
        type : String,
        default : "null"
    },
    status : {
        type : Number,
        default : 1
    },
    deletedAt : {
        type: Date,
        default: null
    }
},{timestamps : true})

let schema = mongoose.model("user", userSchema);
module.exports = schema;