import React, { useEffect } from "react";
import "./OrderCard.css";
import { useDispatch, useSelector } from "react-redux";
import { singleBranchInfo } from "../../../store/apis/branchesApis";

export default function OrderCard({ord, index}) {
  const dispatch = useDispatch();
  const {singleBranchInfos} = useSelector(state => state.branches);

  useEffect(() => {
    if (ord.branchId) {
      dispatch(singleBranchInfo({ id: ord.branchId }));
    }
  }, [dispatch, ord.branchId]);
  
  return (
    <section className="OrderCard__container" key={index}>
      <div className="OrderCard__info">
        <div className="OrderCard__food_info">
          <div className="OrderFood__banner">
            <img
              src="https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="OrderFood__banner"
            />
          </div>
          <div className="OrderFood__details">
            <h1 className="product_title_ts">
              The BVK Biryani (Bai Veetu Kalyanam)
            </h1>
            <p className="product_note_ts">branchId : {ord.branchId}</p>
            <p className="product_note_ts">ORDERID : {ord._id} | Tue, Oct3, 2024</p>
          </div>
        </div>
        <div className="OrderCard__time_info">
          <p className="product_note_ts">{ord.status === 0 ? "Pending" : "Confirmed"}</p>
          {ord.status === 0 ? <div className="check__red"></div> : <div className="check__btn"></div>}
          
        </div>
      </div>
      <div className="OrderCard__actions">
        <div className="OrderCard__actions_info">
          <p className="product_note_ts" style={{ fontWeight: "500" }}>
            Kaara sALNA [ 100ml ] (Spicy Salan) x 2
          </p>
          <p className="product_note_ts" style={{ fontWeight: "600" }}>
            Total Paid: ₹{ord.finalTotal}
          </p>
        </div>
        <div className="OrderCard__actions_buttons">
          <button className="mi_btn mi_btn_md mi_btn_primary">Reorder</button>
          <button className="mi_btn mi_btn_md mi_btn_secondary">Help</button>
        </div>
      </div>
    </section>
  );
}
