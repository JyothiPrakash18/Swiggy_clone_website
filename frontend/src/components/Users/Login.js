import React, { useEffect, useState } from "react";
import LoginForm from "../connectForm/LoginForm";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../store/slices/loginSlice";


const Login = ({ setOpenSidebar }) => {
  const dispatch = useDispatch();

  // const [connect, setConnect] = useState("login");
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    }
  },[])

  return (
    <div className="login_area ">
      <div className="login_container_alt">
        <div className="login_header_area">
          {/* <p className="mi_note leader_showcase_note">
            Enter login details or
            <a href="#">create an account</a>
          </p> */}
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
