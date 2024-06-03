import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FieldComponent from "../FieldComponent/FieldComponent";
import { editCusAddress } from "../../store/apis/loginApis";
import { toast } from "react-toastify";
import { clearMessage } from "../../store/slices/loginSlice";

export default function EditAddressDrawer({ openAddress, setOpenAddress, setAddressUpdated }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');
  const { singleaddress : address ,updateAddressMessage, error} = useSelector(state => state.login);
  const [addresstype, setAddressType] = useState( );

  useEffect(() => {
    if(address.addressType){
      const defaultAddressType = address.addressType === "home" ? 
      "home" : address.addressType === "office" ? 
      "office"  : "others"
    setAddressType(defaultAddressType)
    }
  },[address])

  const initialValue = {
    address : address.address ? address.address : "",
    doorNo : address.doorNo ? address.doorNo : "",
    mob : address.mob ? address.mob : "",
    addressType : address.addressType ? address.addressType : ""
  }
  
  const submitHandler = async (value) => {
    const typAdd = (addresstype === "others") ?  value.addressType : addresstype
    console.log(typAdd)
    console.log(addresstype)

    const inputValues = {
      address : value.address,
      doorNo : value.doorNo,
      mob : value.mob,
      addressType : typAdd
    }
    console.log(inputValues)
    try {
      await dispatch(editCusAddress({inputValues, token, addressId : address._id}));
      setOpenAddress(false);
      setAddressUpdated(prev => !prev);
    } catch (error) {
      return error;
    }
  }
  
  useEffect(() => {
  //   if (error) {
  //     toast(error, {
  //         position: toast.POSITION.BOTTOM_CENTER,
  //         type: 'error',
  //     })
  //     return;
  // }
  if (updateAddressMessage) {
    toast(updateAddressMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'success',
    })
    return;
}
  },[updateAddressMessage]);

  useEffect(() => { 
    return () => {
      dispatch(clearMessage());
    }
  },[dispatch]);
  return (
    <Formik initialValues={initialValue} onSubmit={submitHandler} enableReinitialize={true}>
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
         component = {FieldComponent}
         />
         <Field 
         name="doorNo"
         plname="Door Number" 
         component = {FieldComponent}
         />
         <Field 
         name="mob"
         plname="Mobile Number" 
         component = {FieldComponent}
         />
         <div className="tab_button_group">
            <div className={`tab_button ${addresstype === "home" && "active"}`} onClick={() => {setAddressType("home");}}>
              Home</div>
            <div className={`tab_button center_btn ${addresstype === "office" && "active"}`} onClick={() => {setAddressType("office");
            }}>Office</div>
            <div className={`tab_button ${addresstype === "others" && "active" }`} onClick={() => {
              ;
              setAddressType("others")
          }}>Others</div>
          </div>
          {addresstype === "others" && 
          <Field 
         name="addressType"
         plname="Ex : Friends's Home" 
         component = {FieldComponent}
         />  }
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
