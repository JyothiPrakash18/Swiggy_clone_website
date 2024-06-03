import React from "react";
import { useDispatch } from "react-redux";
import { decreaseCartItemQtys, increaseCartItemQtys } from "../../store/apis/productsApi";

const CartSubItems = ({ item }) => {
  
  const dispatch = useDispatch()


  return (
    <div className="item_wrapper">
      <div className="item_detail">
        <p className="item_name_ts">{item.name}</p>
        <div className="item_end">
        <div className="counter_btn">
          <div className="counter_rate">
            <i className="bx bx-minus" onClick={() => dispatch(decreaseCartItemQtys({id : item._id}))}></i>
          </div>
          <p className="counter_value">{item.quantity}</p>
          <div className="counter_rate">
            <i className="bx bx-plus" onClick={() => dispatch(increaseCartItemQtys({id : item._id}))}></i>
          </div>
        </div>
        </div>
      </div>
      <div className="item_end">
      <p className="item_price_ts">{item.mrp * item.quantity}</p>
      </div>
    </div>
  );
};

export default CartSubItems;
