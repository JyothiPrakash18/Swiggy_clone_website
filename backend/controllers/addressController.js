const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Address = require("../models/addressModels");

module.exports.postAddress = catchAsyncError(async (req, res, next) => {
    const {customerId, address, doorNo, mob, addressType} = req.body;  
    const addresses = await Address.create({customerId, address, doorNo, mob, addressType});
    res.status(200).json({status : true, addresses})
}) 


module.exports.getAddressByCusId = catchAsyncError(async (req, res, next) => {
    const id = req.params.id; 
    const address = await Address.find({  customerId : id });
    if(!address){
        res.status(200).json({ status: false, Message: "User does not have address"});
    }  
    res.status(200).json({ status: true, address });
});


module.exports.editAddress = catchAsyncError(async (req, res, next) => {
    const {  address, doorNo, mob, addressType } = req.body;
    const addressIdToEdit = req.params.id;   
    const updateFields = {address,doorNo,mob, addressType};
    const editedAddress = await Address.findOneAndUpdate({ _id: addressIdToEdit }, updateFields, { new: true });
    res.status(200).json({ status: true,Message: "Address Updated Successfully", editedAddress });
  });


module.exports.getSingleAdd = catchAsyncError(async (req, res, next) => {
    const address = await Address.findById(req.params.id);
    // if (!address) return next(new ErrorHandler("Address not found", 400));
    res.status(201).json({ status: true, address });
})

module.exports.deleteAddress = catchAsyncError(async (req, res, next) => {
    const addressId = req.params.id;
    await Address.findByIdAndDelete({_id :addressId});
    res.status(200).json({ status: true, message: 'Address deleted successfully' });
})
  