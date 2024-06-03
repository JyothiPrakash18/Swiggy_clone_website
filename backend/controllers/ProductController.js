const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Products = require('../models/productsModels');


module.exports.getProducts = catchAsyncError(async (req, res, next) => {

    const resPerPage = 2;
    let buildQuery = () => new ApiFeatures(Products.find(), req.query).search().filter()
    const filtteredProducts = await buildQuery().query.countDocuments({});
    const totalProductsCount = await Products.countDocuments({});
    let productsCount = totalProductsCount;
    if (filtteredProducts !== totalProductsCount) { productsCount = filtteredProducts }
    const products = await buildQuery().paginate(resPerPage).query
    res.status(200).json({ status: true, count: productsCount, resPerPage, products });

});


module.exports.postProducts = catchAsyncError( async(req, res, next) => {
    
    const {name, subCatId, mrp, description} = req.body;
    const Product = await Products.findOne({name});
        if(Product) {
            return next(new ErrorHandler('Product Name Already Exist', 401));
        }
    const products = await Products.create({name, subCatId, mrp, description})
    res.send({status : true,products})
})


module.exports.getProdById = catchAsyncError(async (req, res, next) => {
    const product = await Products.findById(req.params.id);
    // if (!product) return next(new ErrorHandler("Product not found", 400));
    res.status(201).json({ status: true, product });
})