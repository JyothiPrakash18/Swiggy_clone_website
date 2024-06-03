import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FieldComponent from "../FieldComponent/FieldComponent";
import { postAddress } from "../../store/apis/loginApis";
import { clearMessage } from "../../store/slices/loginSlice";
import * as yup from "yup";

export default function AddressDrawer({ openAddress, setOpenAddress, setAddressUpdated,}) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const { customer } = useSelector((state) => state.login);
  const [addresstype, setAddressType] = useState("home");

  const AddressValidateSchema = yup.object({
    address: yup.string().required("Enter Your Address"),
    doorNo: yup.string().required("Enter Your Door No"),
    mob: yup.string().required("Enter Your Mobile No"),
  });

  const initialValue = {
    address: "",
    doorNo: "",
    mob: "",
    addressType: "",
  };

  const submitHandler = async (value, reset) => {
    const typAdd = addresstype === "others" ? value.addressType : addresstype;
    const inputValues = {
      address: value.address,
      doorNo: value.doorNo,
      mob: value.mob,
      addressType: typAdd,
    };
    try {
      await dispatch(
        postAddress({ inputValues, token, customerId: customer._id })
      );
      console.log(inputValues);
      setOpenAddress(false);
      setAddressUpdated((prev) => !prev);
    } catch (error) {
      return error;
    }
    reset.resetForm();
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
      validationSchema={AddressValidateSchema}
    >
      <div className={`Address_drawer ${openAddress && "show"}`}>
        <div className="address_container">
          <div className="address_header">
            <div className="close_icon" onClick={() => setOpenAddress(false)}>
              <i className="bx bx-x address_icon"></i>
            </div>
            <h1 className="mi_miniheading leader_showcase_title">
              Add Your Address
            </h1>
          </div>

          <Form action="#" className="login_forms margin_top">
            <Field
              name="address"
              plname="Address"
              component={FieldComponent}
              error={<ErrorMessage name="address" />}
            />
            <Field
              name="doorNo"
              plname="Door Number"
              component={FieldComponent}
              error={<ErrorMessage name="doorNo" />}
            />
            <Field
              name="mob"
              plname="Mobile Number"
              component={FieldComponent}
              error={<ErrorMessage name="mob" />}
            />
            <div className="tab_button_group">
              <div
                className={`tab_button ${addresstype === "home" && "active"}`}
                onClick={() => {
                  setAddressType("home");
                }}
              >
                Home
              </div>
              <div
                className={`tab_button center_btn ${
                  addresstype === "office" && "active"
                }`}
                onClick={() => {
                  setAddressType("office");
                }}
              >
                Office
              </div>
              <div
                className={`tab_button ${addresstype === "others" && "active"}`}
                onClick={() => {
                  setAddressType("others");
                }}
              >
                Others
              </div>
            </div>
            {addresstype === "others" && (
              <Field
                name="addressType"
                plname="Ex : Friends's Home"
                component={FieldComponent}
              />
            )}

            <div className="login_action">
              <button className="mi_btn mi_btn_md mi_btn_primary">
                Save the Address
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
