const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'customers'
    },
    addressId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'address'
    },
    branchId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'branches'
    },
    subTotal : {
        type: Number,
        required: true
    },
    finalTotal : {
        type: Number,
        required: true
    },
    shippingFee : {
        type: Number,
        required: true
    },
    pay_Type : {
        type: Number,
        default : 1
    },
    status : {
        type : Number,
        default : 0
    },
    deletedAt : {
        type: Date,
        default: null
    },
    disc_Id : {
        type : Number,
        default : null
    }
},{timestamps : true});

let schema = mongoose.model("orders", orderSchema);
module.exports = schema;