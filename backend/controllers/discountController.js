const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Discounts = require("../models/discountsModel");

module.exports.postDiscounts = catchAsyncError(async (req, res, next) => {
    const {name, productId, percentage, flatRate} = req.body;
    
    const discounts = await Discounts.create({name, productId, percentage, flatRate});
    res.send({status : true, discounts})
}) 