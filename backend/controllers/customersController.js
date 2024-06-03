const catchAsyncError = require("../middlewares/asyncCatchError");
const CustomerModel = require("../models/customersModels");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require('crypto');


module.exports.registerCustomer = catchAsyncError(async (req, res, next) => {
    let images;
    if (req.files && req.files.length > 0 && req.files[0].originalname) {
        let url = `${process.env.BACKEND_URL}api/uploads/user/${req.files[0].originalname}`;
        images = url;
    }
    req.body.images = images;
    const customer = await CustomerModel.create(req.body);
    sendToken(customer, 201, res);
});


module.exports.loginCustomer = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("Please enter email and password", 400));
    const findUser = await CustomerModel.findOne({ email }).select("+password");
    if (!findUser) return next(new ErrorHandler("Invalid Email", 401))
    if (!await findUser.isValidPassword(password)) return next(new ErrorHandler("Invalid Password", 401));
    sendToken(findUser, 201, res);
})


module.exports.checkCusAuth = catchAsyncError((req, res, next) => {
    res.status(200).json({ status: true });
})


module.exports.logoutCustomer = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ status: true, Message: " Logged Out" })
});


module.exports.getCustomerProfile = catchAsyncError(async (req, res, next) => {

    const customer = await CustomerModel.findById(req.customer.id);
    res.status(200).json({ status: true, customer });

});

module.exports.updateCustomerProfile = catchAsyncError(async (req, res, next) => {
    const { name,  email , mob} = req.body;
    const customerIdToUpdate = req.params.id;  
    const updateFields = { name, email, mob }; 
    const updatedCustomer = await CustomerModel.findOneAndUpdate( { _id: customerIdToUpdate },  updateFields, { new: true } ); 
    if (!updatedCustomer) {
      return res.status(404).json({ status: false, message: 'Customer not found' });
    } 
    res.status(200).json({ status: true,Message: "Profile Updated Successfully", updatedCustomer });
  });
  