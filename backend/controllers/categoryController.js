const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Category = require('../models/categoriesModels');

module.exports.getCategories = catchAsyncError(async (req, res, next) => {

    const resPerPage = 9;
    let buildQuery = () => new ApiFeatures(Category.find(), req.query).search().filter()
    const filtteredCategories = await buildQuery().query.countDocuments({});
    const totalCategoriesCount = await Category.countDocuments({});
    let categoriesCount = totalCategoriesCount;
    if (filtteredCategories !== totalCategoriesCount) { categoriesCount = filtteredCategories }
    const categories = await buildQuery().paginate(resPerPage).query
    res.status(200).json({ status: true, count: categoriesCount, resPerPage, categories });
});

module.exports.postCategories = catchAsyncError(async(req, res, next) => {
    
    const {name, type, branchId } = req.body;
    const cat = await Category.findOne({name});
    if(cat) {
        return next(new ErrorHandler('Category Name Already Exist', 401));
    }
    const categories = await Category.create({name, type, branchId})
    res.send({status : true,categories})
});