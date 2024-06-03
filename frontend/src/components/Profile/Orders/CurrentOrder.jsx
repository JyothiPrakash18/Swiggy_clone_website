import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { userOrdersList } from "../../../store/apis/ordersApis";

export default function CurrentOrder() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const { customer = {} } = useSelector((state) => state.login);
  const { userOrders = {}} = useSelector((state) => state.orders);

  useEffect(() => {
    if(token){
      dispatch(userOrdersList({token, customerId : customer._id}));
    }
  },[])

  return (
    <>
      <div className="profile_side_area">
        <div class="delivery_content_info">
          <div class="carting_headline">
            <h1 class="carting_headline_ts">Your Orders</h1>

            {/* <h1 class="carting_subheadline_ts">
              You can add, update or delete a delivery address
            </h1> */}
          </div>
          <div class="order_container_list">
            {userOrders.length > 0 && 
              <>
              {userOrders.map((ord, index) => (<OrderCard 
              ord={ord}
              index={index}/>))}
              </>
            }
            
            {/* <OrderCard /> */}
          </div>
        </div>
      </div>
    </>
  );
}
