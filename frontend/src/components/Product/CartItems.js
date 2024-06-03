import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartSubItems from "./CartSubItems";
import { removeCartItem } from "../../store/apis/productsApi";
import { createOrder } from "../../store/apis/ordersApis";
import Swal from "sweetalert2";
import { chargesBasedOnBranch } from "../../store/apis/chargesApi";

const CartItems = ({ page, selectedAddress, id }) => {
  const { items } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const { customer = {} } = useSelector((state) => state.login);
  const { charges: chargesArray = [] } = useSelector((state) => state.products);

  const chargeId = chargesArray.map(chargeItem => chargeItem._id)
  console.log(chargeId)
  useEffect(() => {
    dispatch(chargesBasedOnBranch({ id: id }));
  }, [dispatch, id]);

  const handleEmptyCart = () => {
    Swal.fire({
      title: "Are you sure to clear the items?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Clear",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeCartItem({ id: "all" }));
      }
    });
  };

  const subTotal = items.reduce(
    (total, item) => total + item.quantity * item.mrp,
    0
  );
  const discountAmount = subTotal > 5000 ? 100 : 0;
  let chargesTotal = 0;

  chargesArray.forEach((chargeItem) => {
    const percentage = parseFloat(chargeItem.percentage) / 100;
    chargesTotal += subTotal * percentage;
  });

  // const Delivery_partner_fee = subTotal > 0 ? 19 : 0;
  const finalTotal = (
    subTotal +
    chargesTotal 
    // Delivery_partner_fee -
    // discountAmount
  ).toFixed(2);

  const submitHandler = async () => {
    try {
      if (token) {
        await dispatch(createOrder({order: { customerId: customer._id,cartItems: items, addressId: selectedAddress, branchId: id, chargeId},token})
        );
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="product_cart">
        <div className="product_carting_wrapper">
          <div className="item_space_between">
            <h1 className="section_subheading_ts">Your Items</h1>
            <button className="clear_btn" onClick={handleEmptyCart}>
              clear{" "}
            </button>
          </div>
          {items.length > 0 ? (
            <>
              <div className="item_list">
                {items.map((item) => (
                  <CartSubItems key={item._id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <p className="item_name_ts">Empty</p>
          )}

          <div className="bill_area">
            <p className="billing_heading_ts">Bill Details</p>
            <div className="bill_wrap">
              <p className="bill_body_ts">Item Total</p>
              <p
                className={`bill_body_ts ${subTotal > 5000 ? "strike-out" : ""}`}
              >
                ₹{subTotal}
              </p>
            </div>
            {/* <div className="bill_wrap">
              <p className="bill_body_ts">Delivery partner fee</p>
              <p className="bill_body_ts">₹{Delivery_partner_fee}</p>
            </div> */}
            <div className="bill_wrap">
              <p className="bill_body_ts">Charges</p>
              <p className="bill_body_ts">₹{Math.round(chargesTotal)}</p>
            </div>
            <div className="bill_wrap">
              <p className="bill_body_ts">Discount</p>
              <p className="bill_body_ts">₹ {discountAmount}</p>
            </div>
          </div>
          <div className="total_area">
            <div className="bill_wrap">
              <p className="total_body_ts">TO PAY</p>
              <p className="total_body_ts">₹{Math.round(finalTotal)}</p>
            </div>
          </div>
          <div className="carting__button">
            {page === "productPage" ? (
              <button
                onClick={() => navigate("/cart", { state: { branchId: id } })}
                className="mi_btn mi_btn_md mi_btn_primary full_width"
              >
                Continue
              </button>
            ) : (
              <>
                {token != null && (
                  <button
                    className="mi_btn mi_btn_md mi_btn_primary full_width"
                    onClick={submitHandler}
                  >
                    Proceed to pay
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
