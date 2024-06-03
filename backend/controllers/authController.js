const catchAsyncError = require("../middlewares/asyncCatchError");
const UserModel = require("../models/userModels");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require('crypto');
const twilio = require('twilio');
const twilioPhoneNumber = '+15138170961';



module.exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, mob } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    try {
        await client.messages.create({
            to: `+${mob}`, 
            from: twilioPhoneNumber,
            body: `Your OTP for registration is: ${otp}`,
        });
    } catch (error) {
        console.error('Twilio error:', error);
        return res.status(500).json({ status: false, message: 'Error sending OTP', error: error.message });
    }

    const user = await UserModel.create({ name, email, mob, otp });

    res.status(201).json({ status: true, user, otp });
});


module.exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Please enter email and password", 400));
    const findUser = await UserModel.findOne({ email }).select("+password");
    
    if (!findUser) return next(new ErrorHandler("Invalid Email or Password", 401))
    if (!await findUser.isValidPassword(password)) return next(new ErrorHandler("Invalid Password", 401));

    sendToken(findUser, 201, res);
});


module.exports.checkAuth = catchAsyncError((req, res, next) => {
    res.status(200).json({ status: true });
})

module.exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ status: true, Message: " Logged Out" })

});

module.exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new ErrorHandler("User not found", 401));
    const resetToken = await user.getResetToken();
    await user.save({ validateBeforeSave: false });

    // * Create Reset Url

    const resetUrl = `${process.env.FRONTEND_URL}password/reset/${resetToken}`;
    const message = `Your password reset url is as follows \n\n
    ${resetUrl} \n\n If you have not request this email , then ignore it.`

    try {
        sendEmail({
            email: user.email,
            subject: "Jp Password Recovery",
            message
        });

        res.status(200).json({ status: true, Message: `Email sent to ${user.email}` });

    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(err.message, 500))
    }

});

module.exports.resetPassword = catchAsyncError(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await UserModel.findOne({ resetPasswordToken, resetPasswordTokenExpire: { $gt: Date.now() } });

    if (!user) return next(new ErrorHandler('Password reset token is invalid or expired'));
    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler('Password does not match'));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    sendToken(user, 201, res);

});


module.exports.getUserProfile = catchAsyncError(async (req, res, next) => {

    const user = await UserModel.findById(req.user.id);
    res.status(200).json({ status: true, user });

});


module.exports.changePassword = catchAsyncError(async (req, res, next) => {

    const user = await UserModel.findById(req.user.id).select('+password');

    // Check Old Password 
    if (!await user.isValidPassword(req.body.oldPassword)) return next(new ErrorHandler("Old Password is incorrecr", 401));

    // Assigning New Passoword 
    user.password = req.body.password;
    await user.save();
    res.status(200).json({ status: true, Message: "Password Has been Changed Successfully" });

});


module.exports.updateProfile = catchAsyncError(async (req, res, next) => {

    let newUserData = { name: req.body.name, email: req.body.email };
    let avatar;
    let BASE_URL = process.env.BACKEND_URL;

    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if (req.file) {
        avatar = `${BASE_URL}/uploades/user/${req.file.originalname}`
        newUserData = { ...newUserData, avatar }
    }

    const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, { new: true, runValidators: true });
    res.status(200).json({ status: true, Message: "Profile Updated Successfully", user });

});


