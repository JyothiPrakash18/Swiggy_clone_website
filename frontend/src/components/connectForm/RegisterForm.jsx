import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { registerUser } from "../../store/apis/loginApis";
import { useDispatch, useSelector } from "react-redux";
import FieldComponent from "../FieldComponent/FieldComponent";
import * as yup from "yup";
import { clearMessage } from "../../store/slices/loginSlice";
import { token } from "../../config/utility";

export default function RegisterForm({ setOpenSidebar, setConnect }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { registererror, registerMessage } = useSelector(
    (state) => state.login
  );

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  const LoginValidateSchema = yup.object({
    name: yup.string().required("Enter Your Name"),
    mob: yup.string().required("Enter Your Mobile Number"),
    email: yup.string().required("Enter Your Email"),
    password: yup.string().required("Enter Your Password"),
    images: yup.mixed(),
  });

  const initialValue = {
    name: "",
    mob: "",
    email: "",
    password: "",
    images: "",
  };

  const submitHandler = async (values, reset) => {
    console.log(values);
    const inputValues = {
      name: values.name,
      mob: values.mob,
      email: values.email,
      password: values.password,
      images: avatar,
    };
    try {
      await dispatch(registerUser({ inputValues }));
      if (token) {
        if (registerMessage) {
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
      <Form className="login_forms" enctype="multipart/form-data">
        {registererror === "Invalid Name" && (
          <div className="error-message">{registererror}</div>
        )}
        <Field
          name="name"
          plname="Name"
          component={FieldComponent}
          error={<ErrorMessage name="name" />}
        />
        {registererror === "Duplicate mob error" && (
          <div className="error-message">Mobile Already Exist</div>
        )}
        <Field
          name="mob"
          plname="Mobile Number"
          component={FieldComponent}
          error={<ErrorMessage name="mob" />}
        />
        {registererror === "Duplicate email error" && (
          <div className="error-message">Email Already Exist</div>
        )}
        <Field
          name="email"
          plname="Email"
          component={FieldComponent}
          error={<ErrorMessage name="email" />}
        />

        <Field
          name="password"
          plname="Password"
          type={showPassword ? "text" : "password"}
          component={FieldComponent}
          error={<ErrorMessage name="password" />}
          isPassword={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <Field
          name="avatar"
          type="file"
          onChange={handleImageChange}
          className="form-control"
        />
        {/* {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            style={{ width: "100px" }}
          />
        )} */}

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
          <button className="mi_btn mi_btn_md mi_btn_primary">Register</button>
        </div>
        <p className="item_name_ts">
          By clicking on Login, I willingly agree to abide by and accept the
          Terms & Conditions as well as the Privacy Policy.
        </p>
      </Form>
    </Formik>
  );
}
