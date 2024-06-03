const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please SubCategory category Name"],
        trim: true,
        maxLength: [100, "SubCategory name cannot exceed 100 characters"]
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
    catId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'categories'
    },
    img_url : {
        type: String,
        required: true
    },
    icon: {
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

let schema = mongoose.model("subcategories", subCategorySchema);
module.exports = schema;