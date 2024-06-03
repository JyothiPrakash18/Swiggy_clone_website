const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Config = require("../models/configurationModels");

module.exports.postConfig = catchAsyncError(async (req, res, next) => {
    const {name, isEnabled, branchId} = req.body;
    const config = await Config.create({name, isEnabled, branchId});
    res.status(200).json({status : true, config});
})
