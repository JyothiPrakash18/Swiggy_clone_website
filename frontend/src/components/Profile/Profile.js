import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import MyAddress from "./MyAddress";
import { clearMessage } from "../../store/slices/loginSlice";
import CurrentOrder from "./Orders/CurrentOrder";
import Favourites from "./favourites/Favourites";
import Payment from "./payment/Payment";
const Profile = () => {
  const { customer } = useSelector((state) => state.login);
  const [showTabs, setShowTabs] = useState("profile");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <>
      <div className="page_container body_bg_color">
        <section className="profile_section">
          <div className="mi_container">
            <div className="profile_section_inner_wrapper">
              <article className="profile_sidebar">
                <div className="left_sidebar">
                  <div
                    className={`sidebar_card ${
                      showTabs === "profile" && "active"
                    }`}
                    onClick={() => {
                      setShowTabs("profile");
                    }}
                  >
                    <i className="bx bx-user"></i>
                    <p className="menuLink_ts">Account Info</p>
                  </div>
                  <div
                    className={`sidebar_card ${
                      showTabs === "orders" && "active"
                    }`}
                    onClick={() => {
                      setShowTabs("orders");
                    }}
                  >
                    <i class="bx bx-bowl-hot"></i>
                    <p className="menuLink_ts">Your Orders</p>
                  </div>
                  <div
                    className={`sidebar_card ${
                      showTabs === "favourites" && "active"
                    }`}
                    onClick={() => {
                      setShowTabs("favourites");
                    }}
                  >
                    <i class="bx bx-heart"></i>
                    <p className="menuLink_ts">Your Favourite</p>
                  </div>
                  <div
                    className={`sidebar_card ${
                      showTabs === "payment" && "active"
                    }`}
                    onClick={() => {
                      setShowTabs("payment");
                    }}
                  >
                    <i class="bx bx-credit-card"></i>
                    <p className="menuLink_ts">Payment Options</p>
                  </div>
                  <div
                    className={`sidebar_card ${
                      showTabs === "address" && "active"
                    }`}
                    onClick={() => {
                      setShowTabs("address");
                    }}
                  >
                    <i class="bx bx-current-location"></i>
                    <p className="menuLink_ts">Address</p>
                  </div>
                </div>
              </article>
              <article className="profile_resultbar">
                {showTabs === "profile" && <ProfileInfo customer={customer} />}
                {showTabs === "address" && <MyAddress />}
                {showTabs === "orders" && <CurrentOrder />}
                {showTabs === "payment" && <Payment />}
                {showTabs === "favourites" && <Favourites />}
                {/* {showTabs === "orders" && <MyAddress /> } */}
              </article>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
