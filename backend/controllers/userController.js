const catchAsyncError = require("../middlewares/asyncCatchError");
const userModel = require("../models/usersModels");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require('crypto');

const userRegister = catchAsyncError(async (req, res, next) => {
    const {name, email, mob} = req.body;
    const user = await userModel.create(name, email, mob);
    sendToken(user, 201, res);
})


