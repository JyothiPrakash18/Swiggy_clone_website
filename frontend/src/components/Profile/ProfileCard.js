import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FieldComponent from '../FieldComponent/FieldComponent';
import { editCusProfile } from '../../store/apis/loginApis';
import { toast } from 'react-toastify';
import { clearMessage } from '../../store/slices/loginSlice';

const ProfileCard = () => {

  const { customer = {}, updateMessage, error} = useSelector(state => state.login);
  console.log(customer._id);
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');

    const initialValue = {
        name : customer.name ? customer.name : "",
        email : customer.email ? customer.email : "",
        mob : customer.mob ? customer.mob : ""
      }

      const submitHandler = async (value) => {
        const inputValues = {
            name : value.name,
            email : value.email,
            mob : value.mob
        }
        try {
           await dispatch(editCusProfile({inputValues, token, id : customer._id}))
           console.log(customer._id)
        } catch (error) {
            
        }
      }

      useEffect(() => {
        if (error) {
          toast(error, {
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'error',
          })
          return;
      }
      if (updateMessage) {
        toast(updateMessage, {
            position: toast.POSITION.BOTTOM_CENTER,
            type: 'success',
        })
        return;
    }
      },[error, updateMessage]);

      useEffect(() => { 
        return () => {
          dispatch(clearMessage());
        }
      },[dispatch]);

  return (
    <Formik initialValues={initialValue} onSubmit={submitHandler} enableReinitialize={true}>
    <div class="update_profile">
    <div class="login_container_alt">
      <div class="login_header_area">
        <p class="mi_note leader_showcase_note">Update Profile</p>
      </div>

      <Form action="#" class="login_forms">
      <Field
          name="name"
          plname="Enter Your Name"
          component={FieldComponent}
        />
        <Field
          name="mob"
          plname="Enter Your Mobile Number"
          component={FieldComponent}
        />
        <Field
          name="email"
          plname="Enter Your Email"
          component={FieldComponent}
        />
        <div class="login_action">
          <button class="mi_btn mi_btn_md mi_btn_primary">Update</button>
        </div>
      </Form>
    </div>
  </div>
  </Formik>
  )
}

export default ProfileCard