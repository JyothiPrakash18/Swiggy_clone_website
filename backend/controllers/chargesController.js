const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Charges = require("../models/chargesModel");

module.exports.getCharges = catchAsyncError(async (req, res, next) => {
    const charges = await Charges.findById(req.params.id);
    if (!charges) return next(new ErrorHandler("Charges not found", 400));
    res.status(201).json({ status: true, charges });
})

module.exports.postCharges = catchAsyncError(async (req, res, next) => {
    const {name, productId, percentage} = req.body;
    const Charge = await Charges.findOne({name});
        if(Charge) {
            return next(new ErrorHandler('Charge Name Already Exist', 401));
        }
    const charges = await Charges.create({name, productId, percentage});
    res.send({status : true, charges})
}) 

module.exports.getChargesByBranchId = catchAsyncError(async (req, res, next) => {
    const id = req.params.id; 
    const charges = await Charges.find({  branchId : id });

    if (!charges || charges.length === 0) {
        return next(new ErrorHandler("Charges not found for the given Branch", 400));
    }

    res.status(200).json({ status: true, charges });
});