const catchAsyncError = require("../middlewares/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Branches = require('../models/branchesModels');
const Category = require('../models/categoriesModels');
const Subcategory = require('../models/subCatModels');
const Products = require('../models/productsModels');


module.exports.getBranches = catchAsyncError(async (req, res, next) => {
    const resPerPage = 100;
    let buildQuery = () => new ApiFeatures(Branches.find(), req.query).search().filter()
    const filtteredbranches = await buildQuery().query.countDocuments({});
    const totalbranchesCount = await Branches.countDocuments({});
    let branchesCount = totalbranchesCount;
    if (filtteredbranches !== totalbranchesCount) { branchesCount = filtteredbranches }
    const branches = await buildQuery().paginate(resPerPage).query
    res.status(200).json({ status: true, count: branchesCount, resPerPage, branches });
});

module.exports.branchInfo = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const branches = await Branches.findById(id);
    res.status(200).json({ status : true, branches });
})


module.exports.getBranchesById = catchAsyncError(async (req, res, next) => {
    try {       
        let finalResultSet = {};
        const id = req.params.id;
        const categories = await Category.find({ branchId: id });
        if (categories.length > 0) {
            finalResultSet.cat = JSON.stringify(categories);
            const catId = categories[0]._id;
            const subCategories = await Subcategory.find({ catId });
            if (subCategories.length > 0) {
                finalResultSet.subCat = JSON.stringify(subCategories);
                const subCatId = subCategories[0]._id;
                const products = await Products.find({ subCatId });
                finalResultSet.prod = JSON.stringify(products);
                return res.status(200).json({finalResultSet, status: true  });
            }
        }
        return res.status(404).json({ status: false, message: 'There is no category or products' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
});

module.exports.getSubCatByCat = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const subCatBycatId = await Subcategory.find({ catId : id});
    res.status(200).json({status : true, subCatBycatId});
})

module.exports.getProductsBySub = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const products = await Products.find({ subCatId : id});
    if(!products){
        res.status(200).json({ status: false, Message: "Products Not found"});
    }
    res.status(200).json({status : true, products});
})



module.exports.postbranches = catchAsyncError(async(req, res, next) => {
    const {name, address, p_mob, s_mob, stateId, email} = req.body;
    const branch = await Branches.findOne({name});
        if(branch) {
            return next(new ErrorHandler('Branch Name Already Exist', 401));
        }
    const branches = await Branches.create({name,  address, p_mob, s_mob, stateId, email})
    res.send({status : true,branches})
})