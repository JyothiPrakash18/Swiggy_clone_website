import React, { useEffect } from "react";
import RegisterForm from "../connectForm/RegisterForm";
import { clearMessage } from "../../store/slices/loginSlice";
import { useDispatch } from "react-redux";

const Register = ({setConnect}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    }
  },[])
  return (
    <div className="register_area ">
      <div className="login_container_alt">
        <div className="login_header_area">
          <p className="mi_note leader_showcase_note">
            {/* Sign up or <a href="#" >log in to your account</a> */}
          </p>
        </div>

        <RegisterForm setConnect={setConnect}/>
      </div>
    </div>
  );
};

export default Register;
