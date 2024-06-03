const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const uploades = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "..", "uploads/user"))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
});

const { getProducts, postProducts, getProdById } = require('../controllers/ProductController');
const { isAuthenticate } = require("../middlewares/authenticate");
const { postbranches, getBranches, getBranchesById, getProductsBySub, getSubCatByCat, branchInfo } = require('../controllers/branchesControllers');
const { processPayment, sendStripeApi } = require('../controllers/paymentController');
const { getCategories, postCategories } = require('../controllers/categoryController');
const { getsubsubCategories, postsubCategories } = require('../controllers/subCategoryController');
const { postStates, getStates } = require('../controllers/stateControllers');
const { postCharges, getChargesByBranchId,  } = require('../controllers/chargesController');
const { registerCustomer, loginCustomer, logoutCustomer, getCustomerProfile, checkCusAuth, updateCustomerProfile } = require('../controllers/customersController');
const { postDiscounts } = require('../controllers/discountController');
const { postAddress, getAddressByCusId, editAddress, getSingleAdd, deleteAddress } = require('../controllers/addressController');
const { postConfig } = require('../controllers/configurationController');
const { myOrders, getSingleOrder, proceedToCheckout } = require('../controllers/orderController');

const { userRegister} = require("../controllers/userController");

// branches
router.get('/getbranches', getBranches);
router.get('/getbranches/:id', getBranchesById);
router.get('/getproducts/:id', getProductsBySub);
router.get('/getsubcat/:id', getSubCatByCat);
router.post('/postbranches', postbranches);
router.get('/branchinfo/:id', branchInfo);

//categories
router.get('/categories', getCategories);
router.post('/postcategory', postCategories);

//subcat
router.get('/subcategories', getsubsubCategories);
router.post('/postsubcat', postsubCategories);

//products
router.get("/products", getProducts);
router.post('/postproducts',  postProducts)
router.get("/getproduct/:id", getProdById);

//customer 
router.post("/cusregister",uploades.array("images"), registerCustomer);
router.post("/cuslogin", loginCustomer);
router.get("/cuslogout", logoutCustomer);
router.get("/myprofile", isAuthenticate, getCustomerProfile);
router.post("/check-auth", checkCusAuth);
router.put("/updatecusprofile/:id",isAuthenticate, updateCustomerProfile);


//state
router.post("/poststate", postStates);
router.get("/getstates", getStates);

//charges
router.post("/postcharges", postCharges);
router.get("/getcharges/:id", getChargesByBranchId);

//orders
// router.post("/orderitems", postOrderItems);
router.post("/checkout", isAuthenticate, proceedToCheckout);
router.get("/myorders/:id", isAuthenticate, myOrders);
router.get("/order/:id", isAuthenticate, getSingleOrder);

//discount 
router.post("/postdiscount", postDiscounts);

//address
router.post("/postaddress", postAddress);
router.get("/getaddress/:id", getAddressByCusId);
router.put("/editaddress/:id",  editAddress);
router.get("/getsingleadd/:id",isAuthenticate,  getSingleAdd);
router.delete("/deleteaddress/:id", deleteAddress);

//config
router.post("/postconfig", postConfig);

//payment
router.post("/payment/process",isAuthenticate, processPayment);
router.get("/stripeapi",isAuthenticate, sendStripeApi);


module.exports = router;
