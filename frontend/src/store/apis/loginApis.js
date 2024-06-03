import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BACKEND_URL } from "../../config/utility";

export const registerUser = createAsyncThunk("login/registerUser",async ({ inputValues }) => {
  console.log(inputValues)
    try {
      const formData = new FormData();
      formData.append("name", inputValues.name);
      formData.append("email", inputValues.email);
      formData.append("password", inputValues.password);
      formData.append("mob", inputValues.mob);
      formData.append("images", inputValues.images);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`${API_BACKEND_URL}cusregister`,formData,config);
      return data;
    } catch (error) {
      return { error: error.response.data.message };
    }
  }
);

export const loginUser = createAsyncThunk("login/loginUser",async ({ inputValues }) => {
    const formData = new FormData();
    formData.append("email", inputValues.email);
    formData.append("password", inputValues.password);

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(`${API_BACKEND_URL}cuslogin`, formData, config);
      console.log(data);
      return await data;
    } catch (error) {
      return { error: error.response.data.message };
    }
  }
);

export const loadUser = createAsyncThunk("login/loadUser", async ({ token }) => {
    try {
      const data = await fetch(`${API_BACKEND_URL}myprofile`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });

      if (data.ok) return await data.json();
      else return { error: true };
    } catch (error) {}
  }
);

export const logoutUser = createAsyncThunk("login/logoutUser", async () => {
  try {
    const { data } = await axios.get(`${API_BACKEND_URL}cuslogout`);
    return await data;
  } catch (error) {
    return { error: error.response.data.message };
  }
});

export const postAddress = createAsyncThunk("login/postAddress", async ({ inputValues, token, customerId }) => {
  const formData = new FormData();
  formData.append("address", inputValues.address);
  formData.append("doorNo", inputValues.doorNo);
  formData.append("mob", inputValues.mob);
  formData.append("addressType" , inputValues.addressType);
  formData.append("customerId", customerId);

  try {
    const config = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${API_BACKEND_URL}postaddress`, formData, config);
    console.log(data);
    return await data;
  } catch (error) {    
    return { error: error.response.data.message };
  }
});

export const getAddressByCusId = createAsyncThunk("login/getAddressByCusId", async({token, customerId}) => {
  try {
    const config = {
        headers: {
            "Content-Type": 'application/json',
            "authorization": `Bearer ${token}`
        }
    }
    const {data} = await axios.get(`${API_BACKEND_URL}getaddress/${customerId}`,  config)
    return data
} catch (error) {
    return { error: `Test Error${error.response.data.message}` };
}  
})

export const editCusAddress = createAsyncThunk("login/editCusAddress", async ({inputValues, token, addressId}) => {
  const formData = new FormData();
  formData.append("address", inputValues.address);
  formData.append("doorNo", inputValues.doorNo);
  formData.append("mob", inputValues.mob);
  formData.append("addressType" , inputValues.addressType);
  console.log(inputValues.addressType);
  try {
    const config = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`${API_BACKEND_URL}editaddress/${addressId}`, formData, config);
    console.log(data);
    return data;
  } catch (error) {
    return { error: error.response.data.message };
  }
})


export const getSingleAdd = createAsyncThunk("login/getSingleAdd", async({id, token}) => {
  try {
    const config = {
      headers: {
          "Content-Type": 'application/json',
          "authorization": `Bearer ${token}`
      }
  }
    const {data} = await axios.get(`${API_BACKEND_URL}getsingleadd/${id}`, config);
    return await data;

  } catch (error) {
    return { error: error.response.data.message };
    
  }
})

export const editCusProfile = createAsyncThunk("login/editCusProfile", async ({ inputValues, token, id }) => {
  const formData = new FormData();
  formData.append("name", inputValues.name);
  formData.append("email", inputValues.email);
  formData.append("mob", inputValues.mob);

  try {
    const config = {
      headers: {
        "content-type": "application/json", 
        "authorization": `Bearer ${token}`,
      }
    }

    const { data } = await axios.put(`${API_BACKEND_URL}updatecusprofile/${id}`, formData, config);
    return await data; 
  } catch (error) {
    return { error: error.response.data.message };
  }
});


export const delAddress = createAsyncThunk("login/delAddress", async ({token, addressId}) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json", 
        "authorization": `Bearer ${token}`,
      }
    }
    const {data} = await axios.delete(`${API_BACKEND_URL}deleteaddress/${addressId}`, config);
    return data; 
  }catch (error) {
    return { error: error.response.data.message };
  }
})

