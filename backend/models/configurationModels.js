const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    isEnabled : {
        type : String,
        default : null
    },
    branchId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'branches'
    },
    KITCHEN_APPROVAL:{
        type : Number,
        default : 0
    },
    DIRECT_CONFIRMATION:{
        type : Number,
        default : 0
    },
    PRINTER_ENABLE:{
        type : Number,
        default : 0
    },
    OUT_FOR_DELIVERY:{
        type : Number,
        default : 0
    },
    SMS_CONFIRMATION:{
        type : Number,
        default : 0
    },
    SMS_OUT_FOR_DELIVERY:{
        type : Number,
        default : 0
    },
    SMS_CANCEL_ORDER:{
        type : Number,
        default : 0
    },
    EMAIL_CONFIRMATION :{
        type : Number,
        default : 0
    },
    status : {
        type : Number,
        default : 0
    },
    deleted_at : {
        type: Date,
        default: null
    } 
},{timestamps : true})

let schema = mongoose.model("configurations", configurationSchema);
module.exports = schema;