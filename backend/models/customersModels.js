const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');

const customersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter customers Name"],
        trim: true,
        maxLength: [100, "customers name cannot exceed 100 characters"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default : null
    },
    mob: {
        type: Number,
        required: [true, 'Please enter Mobile No'],
        unique: true,
        maxlength: [10, "Mobile No Should be 10 numbers"]
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password "],
        maxlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    images:{
        type: String,
        default : null
    },
    otpNumber : {
        type : String,
        default : null
    },
    status : {
        type : Number,
        default : 0
    },
    deletedAt : {
        type: Date,
        default: null
    }
},{timestamps : true});



customersSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()
    const salt = 10
    this.password = await bcrypt.hash(this.password, salt)
});

customersSchema.methods.getJwtToken = function () {
    return JWT.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME });
}

customersSchema.methods.isValidPassword = async function (enterdPassword) {
    return bcrypt.compare(enterdPassword, this.password)
}

customersSchema.methods.getResetToken = function () {
    //Generate Token
    const token = crypto.randomBytes(20).toString('hex');

    //Generate Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token;
}



let schema = mongoose.model("customers", customersSchema);
module.exports = schema;