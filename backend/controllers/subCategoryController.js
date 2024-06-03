const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Subcategory = require('../models/subCatModels');


module.exports.getsubsubCategories = catchAsyncError(async (req, res, next) => {

    const resPerPage = 2;
    let buildQuery = () => new ApiFeatures(Category.find(), req.query).search().filter()
    const filtteredsubCategories = await buildQuery().query.countDocuments({});
    const totalsubCategoriesCount = await Category.countDocuments({});
    let subCategoriesCount = totalsubCategoriesCount;
    if (filtteredsubCategories !== totalsubCategoriesCount) { subCategoriesCount = filtteredsubCategories }
    const subCategories = await buildQuery().paginate(resPerPage).query
    res.status(200).json({ status: true, count: subCategoriesCount, resPerPage, subCategories });
});

module.exports.postsubCategories = catchAsyncError(async(req, res, next) => {
    
    const {name, catId, img_url } = req.body;
    const cat = await Subcategory.findOne({name});
    if(cat) {
        return next(new ErrorHandler('subCategory Name Already Exist', 401));
    }
    const subCategories = await Subcategory.create({name, catId, img_url})
    res.send({status : true,subCategories})
});