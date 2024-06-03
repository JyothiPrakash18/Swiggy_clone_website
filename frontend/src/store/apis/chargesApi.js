import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BACKEND_URL } from "../../config/utility";


export const chargesBasedOnBranch = createAsyncThunk("charges/chargesBasedOnBranch", async ({id}) => {
    try {
        const { data } = await axios.get(`${API_BACKEND_URL}getcharges/${id}`);
        return  data;
      } catch (error) {
        return error;
      }
})