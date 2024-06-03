import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BACKEND_URL } from "../../config/utility";

export const createOrder = createAsyncThunk("orders/createOrder",async ({ order, token }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${API_BACKEND_URL}checkout`, order, config );
      return  data;
    } catch (error) {
      return error;
    }
  }
);


export const userOrdersList = createAsyncThunk("orders/userOrdersList", async({token, customerId}) => {
    try {
        const config = {
            headers: {
                "Content-Type": 'application/json',
                "authorization": `Bearer ${token}`
            }
        }
        const {data} = await axios.get(`${API_BACKEND_URL}myorders/${customerId}`,  config)
        return await data
    } catch (error) {
        return error;
    } 
})

export const getSingleOrder = createAsyncThunk("orders/getSingleOrder", async({token, id}) => {
    try {
       const config = {
        headers : {
            "Content-Type" : "application/json",
            "authorization" : `Bearer ${token}`
        }
       } 
       const {data} = await axios.get(`${API_BACKEND_URL}order/${id}`, config)
       return await data
    } catch (error) {
        return error;
        
    }
})