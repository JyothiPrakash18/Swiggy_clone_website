const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'orders'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'products'
    },
    productName: {
        type: String,
        required : true
    },
    mrp: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productTotal: {
        type: Number,
        required: true
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

let schema = mongoose.model("orderItems", orderItemsSchema);
module.exports = schema;