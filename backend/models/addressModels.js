const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'customers'
    },
    address : {
        type : String,
        required: true
    },
    doorNo : {
        type : String,
        required: true
    },
    Lankmark : {
        type : String,
        default : null
    },
    mob : {
        type : Number,
        required: true
    },
    addressType : {
        type : String,
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

let schema = mongoose.model("address", addressSchema);
module.exports = schema;