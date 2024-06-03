const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const States = require("../models/statesModels");


module.exports.getStates = catchAsyncError(async (req, res, next) => {

    const resPerPage = 8;
    let buildQuery = () => new ApiFeatures(States.find(), req.query).search().filter()
    const filtteredStates = await buildQuery().query.countDocuments({});
    const totalStatesCount = await States.countDocuments({});
    let statesCount = totalStatesCount;
    if (filtteredStates !== totalStatesCount) { statesCount = filtteredStates }
    const states = await buildQuery().paginate(resPerPage).query
    res.status(200).json({ status: true, count: statesCount, resPerPage, states });

});

module.exports.postStates = catchAsyncError( async(req, res, next) => {
    
    const {name, stateCode} = req.body;
    const State = await States.findOne({name});
        if(State) {
            return next(new ErrorHandler('Product Name Already Exist', 401));
        }
    const states = await States.create({name, stateCode});
    res.send({status : true,states})
})