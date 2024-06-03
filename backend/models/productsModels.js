const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product Name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    images : [
        {
            image : {
                type : String,
                default : "null"
            }
        }
    ],
    subCatId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'subcategories'
    },
    mrp : {
        type: Number,
        required: true
    },
    sellingPrice : {
        type: Number,
        default : null
    },
    description : {
        type: String,
        required: true
    },
    portion : {
        type : Number,
        default : null
    },
    variant : {
        type : Number,
        default : null
    },
    anotherPrice : {
        type : Number,
        default : null
    },
    isFeatured : {
        type : Number,
        default : null
    },
    isBestSelling : {
        type : Number,
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

let schema = mongoose.model("products", productSchema);
module.exports = schema;