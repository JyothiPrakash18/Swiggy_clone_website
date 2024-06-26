module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV == 'development') return res.status(err.statusCode).json({ status: false, message: err.message, stack: err.stack, error: err });
    if (process.env.NODE_ENV == 'production') {

        let message = err.message;
        let error = new Error(message);

        if (err.name == "ValidationError") {
            message = Object.values(err.errors).map(value => value.message);
            error = new Error(message);
            err.statusCode = 400;
        }

        if (err.name == "CastError") {
            message = `Resource not found: ${err.path}`;
            error = new Error(message);
            err.statusCode = 400;
        }

        if (err.code == 11000) {
            message = `Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message);
            err.statusCode = 400;
        }

        if (err.name == 'JSONWebTokenError') {
            message = 'Json Web Token is Invalid . Try again';
            error = new Error(message);
            err.statusCode = 400;
        }

        if (err.name == 'TokenExpiredError') {
            message = 'Json Web Token is Expired . Try again';
            error = new Error(message);
            err.statusCode = 400;
        }

        res.status(err.statusCode).json({
            status: false,
            message: error.message || "Internal Server Error"
        });
    }

};