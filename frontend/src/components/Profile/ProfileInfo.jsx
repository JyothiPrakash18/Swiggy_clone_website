import React, { useState } from "react";
import Logo from "../../assets/account.webp";
import ProfileCard from "./ProfileCard";
import { useDispatch } from "react-redux";
import { loadUser } from "../../store/apis/loginApis";

export default function ProfileInfo({ customer }) {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="user_login_area">
      {!showProfile && (
        <div className="user_content_info">
          <div className="carting_headline">
            <h1 className="carting_headline_ts">{customer.name} </h1>
            <div className="profile_info">
              <h1 className="carting_subheadline_ts">{customer.mob} </h1>
              <h1 className="carting_subheadline_ts">-</h1>
              <h1 className="carting_subheadline_ts">{customer.email} </h1>
            </div>
          </div>
          <div className="account_button_group">
            <button
              className="mi_btn mi_btn_md mi_btn_secondary"
              onClick={() => {
                setShowProfile(true);
              }}
            >
              <span className="btn_bold">Edit Your Account</span>
            </button>
          </div>
        </div>
      )}

      {showProfile && <ProfileCard />}
      
      <div className="user_content_banner">
        <img src={Logo} alt="account" />
      </div>
    </div>
  );
}
