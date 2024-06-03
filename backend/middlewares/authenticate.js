const ErrorHandler = require("../utils/errorHandler");
const asyncCatchError = require("./asyncCatchError");
const JWT = require('jsonwebtoken');
const customer = require("../models/customersModels");


module.exports.isAuthenticate = asyncCatchError(async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return next(new ErrorHandler('Login First to handle this resource', 401));

    const decoded = JWT.verify(token, process.env.JWT_SECRET)
    req.customer = await customer.findById(decoded.id)
    next();
})


