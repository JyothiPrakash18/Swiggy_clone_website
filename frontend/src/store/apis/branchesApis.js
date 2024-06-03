import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BACKEND_URL } from "../../config/utility";
import axios from "axios";

export const getBranches = createAsyncThunk("branches/getbranches",async () => {
    try {
      const { data } = await axios.get(`${API_BACKEND_URL}getbranches`);
      return await data;
    } catch (error) {
      return error;
    }
  }
);

export const getBranchInfo = createAsyncThunk('branches/getBranchInfo', async({id}) => {
  try {
    const { data } = await axios.get(`${API_BACKEND_URL}getbranches/${id}`);
    return  data;
  } catch (error) {
    return error;
  }
});

export const getProductsByBranch = createAsyncThunk('branches/getProducts', async({id}) => {
  try{
      const data = await fetch(`${API_BACKEND_URL}getproducts/${id}` , {
          method : "GET",
          headers : {
              "content-type": "application/json"
          }
      })

      if(data.ok) return await data.json();
      else return {error : true}

  }catch(error){
    return error;
  }
})

export const singleBranchInfo = createAsyncThunk('branches/singleBranchInfo', async({id}) => {
  try {
    const { data } = await axios.get(`${API_BACKEND_URL}branchinfo/${id}`);
    return  data;
  } catch (error) {
    return error;
  }
})