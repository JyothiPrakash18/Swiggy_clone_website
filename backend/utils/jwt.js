const sendToken = (customer, statusCode, res) => {

    const token = customer.getJwtToken();
    res.status(statusCode).json({
        status: true,
        token,
        customer
    })
}

module.exports = sendToken;