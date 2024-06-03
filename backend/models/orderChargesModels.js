const mongoose = require('mongoose');

const orderChargesSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'orders'
    },
    chargeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'charges'
    },
    value: {
        type: Number,
        default: null
    },
    charge: {
        type: Number,
        default: null
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

let schema = mongoose.model("orderCharges", orderChargesSchema);
module.exports = schema;