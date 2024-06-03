import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BACKEND_URL } from "../../config/utility";
import axios from "axios";


export const getSingleProduct = createAsyncThunk("products/getSingleProduct", async ({ id }) => {
    try {
        const data = await fetch(`${API_BACKEND_URL}getproduct/${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        });
        if (data.ok) return await data.json();
        else return { error: true }
    } catch (error) {
        return error;
    }
})  

export const addCartItem = createAsyncThunk("products/addCartItem", async ({id, quantity}) => {
    try {
        const { data } = await axios.get(`${API_BACKEND_URL}getproduct/${id}`);
    
        return {
          product: {
            _id: data.product._id,
            name: data.product.name,
            // description: data.product.description,
            mrp : data.product.mrp,
            quantity
          },
          status: data.status,
        };
      } catch (error) {
        return { error: error.response.data.message };
      }
})

export const increaseCartItemQtys = createAsyncThunk("products/increaseCartItemQtys", async ({ id}) => {
    try {
      const { data } = await axios.get(`${API_BACKEND_URL}getproduct/${id}`);
  
      return {
          id: data.product._id,
          status: data.status
      };
    } catch (error) {
      return { error: error.response.data.message };
    }
  });


  export const decreaseCartItemQtys = createAsyncThunk("products/decreaseCartItemQtys", async ({ id}) => {
    try {
      const { data } = await axios.get(`${API_BACKEND_URL}getproduct/${id}`);
  
      return {
          id: data.product._id,
          status: data.status
      };
    } catch (error) {
      return { error: error.response.data.message };
    }
  });

  export const removeCartItem = createAsyncThunk("products/removeCartItem", async ({ id}) => {
    try {  
      return {
          id,
          status: true
      };
    } catch (error) {
      return { error: error.response.data.message };
    }
  });