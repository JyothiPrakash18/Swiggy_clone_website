const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter category Name"],
        trim: true,
        maxLength: [100, "category name cannot exceed 100 characters"]
    },
    images : [
        {
            image : {
                type : String,
                default : "null"
            }
        }
    ],
    url: {
        type: String,
        default : null
    },
    type: {
        type: String,
        required: true
    },
    branchId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'branches'
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

let schema = mongoose.model("categories", categorySchema);
module.exports = schema;