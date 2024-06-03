const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const OrderItems = require("../models/orderItemsModels");


module.exports.postOrderItems = catchAsyncError(async (req, res, next) => {
    const {orderId, productId, cost, quantity, total} = req.body;
    const orderItems = await OrderItems.create({orderId, productId, cost, quantity, total});
    res.send({status : true,orderItems})
}) 
//