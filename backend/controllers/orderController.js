const mongoose = require("mongoose");
const Orders = require("../models/orderModels");
const OrderCharges = require("../models/orderChargesModels");
const OrderItems = require("../models/orderItemsModels");
const Payments = require("../models/paymentModels");
const catchAsyncError = require("../middlewares/asyncCatchError");
const Charges = require("../models/chargesModel");
const Products = require("../models/productsModels");
const subCatModels = require("../models/subCatModels");
const Config = require("../models/configurationModels");
const fs = require("fs");
const path = require("path");

module.exports.myOrders = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const orders = await Orders.find({ customerId: id });
  if (!orders) {
    res
      .status(200)
      .json({ status: false, Message: "User does not have Orders" });
  }
  res.status(200).json({ status: true, orders });
});

module.exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Orders.findById(req.params.id);
  res.status(200).json({ status: true, order });
});

module.exports.proceedToCheckout = catchAsyncError(async (req, res, next) => {
  const { customerId, cartItems, addressId, branchId, chargeId } = req.body;

  const productIds = cartItems.map((item) => item._id);
  const quantities = cartItems.map((item) => item.quantity);
  const productNames = cartItems.map((item) => item.name);
  // console.log(productIds)

  let subTotal = 0;

  if (cartItems.length > 0) {
    const products = await Products.find({ name: { $in: productNames } });
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const quantity = quantities[i];
      subTotal += quantity * product.mrp;
    }

    const shippingFee = 19;

    // Fetch the charge percentage from Charges model
    const charge = await Charges.findOne({ _id: chargeId });
    if (!charge) {
      return res.status(400).json({ status: false, message: "Charge not found" });
    }

    const chargePercentage = parseFloat(charge.percentage);

    // Calculate the charge for the orders
    const chargeAmount = (subTotal * chargePercentage) / 100;

    
    const order = await Orders.create({
      customerId: customerId,
      addressId: addressId,
      subTotal: subTotal,
      finalTotal: subTotal + chargeAmount, 
      shippingFee: shippingFee,
      branchId: branchId,
    });

    const orderId = order._id;

    // Create OrderItems
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const quantity = cartItems.find(item => item.name === product.name).quantity;
      await OrderItems.create({
        orderId: orderId,
        productId: product._id,
        productName: product.name,
        quantity: quantity,
        mrp: product.mrp,
        productTotal: quantity * product.mrp,
      });
    }

    // Create OrderCharges
    await OrderCharges.create({
      orderId: orderId,
      chargeId: chargeId,
      value: chargePercentage,
      charge: chargeAmount,
    });

    // Update order status
    const branchConfig = await Config.findOne({ branchId: branchId });
    let status = 0;
    if (branchConfig && branchConfig.DIRECT_CONFIRMATION === 1) status = 1;
    await Orders.findByIdAndUpdate(orderId, { status: status });

    if (branchConfig && branchConfig.PRINTER_ENABLE === 1) {
      let productDetails = "";
      for (let i = 0; i < cartItems.length; i++) {
        const { name, quantity, mrp } = cartItems[i];
        productDetails += `
          <tr>
           <td>${name}</td>
           <td>${mrp}</td>
           <td>${quantity}</td>
           <td>${quantity * mrp}</td>
          </tr>`;
      }

      const htmlContent = `
  <html>
    <body>
      <h1>Order Details</h1>
      <table>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        ${productDetails}
      </table>
      <p>Subtotal: ${subTotal}</p>
      <p>Shipping Fee: ${shippingFee}</p>
      <p>Final Total: ${subTotal + chargeAmount}</p>
    </body>
  </html>`;

      const folderPath = path.join(__dirname, "..", "uploads/orderDetails");
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      const filePath = path.join(folderPath, `order_${orderId}.html`);
      fs.writeFileSync(filePath, htmlContent);

      const fileURL = `${process.env.BACKEND_URL}api/uploads/orderDetails/order_${orderId}.html`;
      res.status(200).json({
        status: true,
        order,
        Message: "Order Created Successfully",
        fileURL,
      });
    } else {
      res
        .status(200)
        .json({ status: true, order, Message: "Order Created Successfully" });
    }

  } else {
    res.status(400).json({ status: false, message: "There is no product" });
  }
});

