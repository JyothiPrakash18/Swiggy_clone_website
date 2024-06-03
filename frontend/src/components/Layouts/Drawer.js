import React, { useState } from "react";
import LoginForm from "../connectForm/LoginForm";
import RegisterForm from "../connectForm/RegisterForm";
import ProfileForm from "../connectForm/ProfileForm";

export default function Drawer({ OpenSidebar, setOpenSidebar, ref }) {
  const [connect, setConnect] = useState("login");

  return (
    <div className={`sideMenu_drawer ${OpenSidebar && "show"}`}>
      {connect === "login" && (
        <div className="login_container">
          <div className="close_icon" onClick={() => setOpenSidebar(false)}>
            <i className="bx bx-x"></i>
          </div>
          <div className="login_header_area">
            <h1 className="mi_headingLite leader_showcase_title">Login</h1>
            <p className="mi_body leader_showcase_note">
              or{" "}
              <span className="mi_link" onClick={() => setConnect("register")}>
                create an account
              </span>
            </p>
          </div>
          <div className="login_main_wrapper_sidebar">
            <LoginForm setOpenSidebar={setOpenSidebar} />
          </div>
        </div>
      )}

      {connect === "register" && (
        <div className="login_container">
          <div className="close_icon" onClick={() => setOpenSidebar(false)}>
            <i className="bx bx-x"></i>
          </div>
          <div className="login_header_area">
            <h1 className="mi_headingLite leader_showcase_title">Sign up</h1>
            <p className="mi_body leader_showcase_note">
              or{" "}
              <span className="mi_link" onClick={() => setConnect("login")}>
                Login to your account
              </span>
            </p>
          </div>

          <div className="login_main_wrapper_sidebar">
            <RegisterForm
              setConnect={setConnect}
              setOpenSidebar={setOpenSidebar}
            />
          </div>
        </div>
      )}

      {connect === "profile" && (
        <div className="login_container">
          <div className="close_icon" onClick={() => setOpenSidebar(false)}>
            <i className="bx bx-x"></i>
          </div>
          <div className="login_header_area">
            <h1 className="mi_headingLite leader_showcase_title">
              Add Profile
            </h1>
            <p className="mi_body leader_showcase_note">
              Provide a display picture for your account
            </p>
          </div>

          <div className="login_main_wrapper_sidebar">
            <ProfileForm
              setConnect={setConnect}
              setOpenSidebar={setOpenSidebar}
            />
          </div>
        </div>
      )}
    </div>
  );
}
