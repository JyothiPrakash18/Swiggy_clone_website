import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/apis/loginApis";
import { Field, Form, Formik, ErrorMessage } from "formik";
import FieldComponent from "../FieldComponent/FieldComponent";
import * as yup from "yup";
import { token } from "../../config/utility";
import { clearMessage } from "../../store/slices/loginSlice";

export default function LoginForm({ setOpenSidebar }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { error: loginError, loginMessage } = useSelector(
    (state) => state.login
  );

  const LoginValidateSchema = yup.object({
    email: yup
      .string()
      .required("Enter your Email")
      .email("Enter valid Email"),
    password: yup.string().required("Password is required"),
  });

  const initialValue = {
    email: "",
    password: "",
  };

  const submitHandler = async (values, reset) => {
    const inputValues = {
      email: values.email,
      password: values.password,
    };

    try {
      await dispatch(loginUser({ inputValues }));
      if (token) {
        if (loginMessage) {
          setOpenSidebar(false);
          reset.resetForm();
        }
      } else {
        setOpenSidebar(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={submitHandler}
      validationSchema={LoginValidateSchema}
    >
      <Form className="login_forms">
        {loginError === "Invalid Email" && (
          <div className="error-message">{loginError}</div>
        )}
        <Field
          name="email"
          plname="Email Address"
          component={FieldComponent}
          error={<ErrorMessage name="email" className="error" />}
        />

        {loginError === "Invalid Password" && (
          <div className="error-message">{loginError}</div>
        )}
        <Field
          name="password"
          plname="Password"
          type={showPassword ? "text" : "password"}
          component={FieldComponent}
          error={<ErrorMessage name="password" className="error" />}
          isPassword={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* <div className="show-password-option">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div> */}
        <div className="login_action">
          <button className="mi_btn mi_btn_md mi_btn_primary">Login</button>
        </div>
        <p className="item_name_ts">
          By clicking on Login, I willingly agree to abide by and accept the
          Terms & Conditions as well as the Privacy Policy.
        </p>
      </Form>
    </Formik>
  );
}
