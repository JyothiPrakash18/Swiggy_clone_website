const mongoose = require('mongoose');

const discountsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter discounts Name"],
        trim: true,
        maxLength: [100, "discounts name cannot exceed 100 characters"]
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'products'
    },
    mode: {
        type: Number,
        default: null
    },
    percentage: {
        type: Number,
        default : null
    },
    flatRate: {
        type: Number,
        required: true
    },
    inclusive: {
        type: String,
        default : null
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

let schema = mongoose.model("discounts", discountsSchema);
module.exports = schema;