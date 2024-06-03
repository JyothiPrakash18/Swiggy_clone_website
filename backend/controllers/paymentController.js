const catchAsyncError = require('../middlewares/asyncCatchError')
const stripe = require('stripe')("sk_test_51OMWCySIpahh2AOEyqJzv3TydzcShxMGgcxZh1Vm2k60dGA5sqCOLLiAs610rw4emzbCcjSEXPWohl6d3D16uO4m00g0UgxiQn")

exports.processPayment = catchAsyncError(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount : req.body.amount,
        description : "TEST PAYMENT",
        currency : "usd",
        metadata : {integration_check : "accept_payment"},
        shipping : req.body.shipping
    })

    res.status(200).json({
        success : true,
        client_secret : paymentIntent.client_secret
    })
})

exports.sendStripeApi = catchAsyncError(async(req, res, next) => {
    res.status(200).json({
        stripeApiKey : process.env.STRIPE_API_KEY
    })
})