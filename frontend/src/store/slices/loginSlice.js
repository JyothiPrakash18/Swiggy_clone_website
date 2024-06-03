import { createSlice } from "@reduxjs/toolkit";
import { delAddress, editCusAddress, editCusProfile, getAddressByCusId, getSingleAdd, loadUser, loginUser, logoutUser, postAddress, registerUser } from "../apis/loginApis";

const initialState = {
    token : null,
    success: false,
    error: false,
    registererror : false,
    loading: true,
    status : false,
    registerCustomer: {},
    customer: {},
    address : {},
    singleaddress : {},
    register: false,
    Message: "",
    loginMessage: "",
    registerMessage: "",
    updateMessage: "",
    updateAddressMessage: "",
    isAddressDeleted: false,
    loginStatus: false
}

export const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        updateSuccess: (state, action) => {
            state.success = action.payload
        },

        updateError: (state, action) => {
            state.error = action.payload
        }, 
        clearMessage: (state, action) => {
            state.error = "";
            state.registererror = "";
            state.Message = "";
            state.updateMessage = "";
            state.updateAddressMessage = "";
            state.loginMessage = "";
            state.registerMessage = ""
        },
        // logoutSuccess : (state) => {
        //     state.customer = {};
        // }
    },
    extraReducers : (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.registerCustomer = {};
            state.registererror = false;
            state.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            const { token,customer, status, Message, error} = action.payload;
            if(status){
                state.loading = false;
                state.isAuthenticated = true;
                state.registerCustomer = customer;
                state.register = true;
                state.registerMessage = Message;
                localStorage.setItem("access_token", token);

            } else {
                state.registererror = error;
            }
        })
        builder.addCase(registerUser.rejected, (state, action) => {})
        builder.addCase(loginUser.pending, (state, action) => {
            state.token = null;
            state.error = false;
            state.loginMessage = "";
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const { token, status, error, Message } = action.payload;
            if (status) {
                state.loading = false;
                state.isAuthenticated = true;
                state.loginStatus = true;
                state.register = true;
                state.token = token;
                state.loginMessage = Message;
                localStorage.setItem("access_token", token);
            } else {
                state.error = error;
            }
        })
        builder.addCase(loginUser.rejected, (state, action) => {})
        builder.addCase(loadUser.pending, (state) => {
            state.customer = {};
            state.error = false;
            state.loading = true;

        })
        builder.addCase(loadUser.fulfilled, (state, action) => {

            const { customer, status, error } = action.payload;
            if (status) {
                state.loading = false;
                state.isAuthenticated = true;
                state.customer = customer;
            } else {
                state.error = error;
            }

        })
        builder.addCase(loadUser.rejected, (state, action) => { });
        builder.addCase(logoutUser.pending, (state) => {
            state.error = false;
            state.Message = "";
            state.loading = true;

        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            const { status, Message, error } = action.payload;
            if (status) {
                state.loading = false;
                state.register = false;
                state.isAuthenticated = false;
                state.token = localStorage.removeItem("access_token");
                state.customer = {};
                state.address = {};
                state.Message = Message;
                state.loginMessage = "";
            }else {
                state.error = error
            }
        });
        builder.addCase(logoutUser.rejected, (state, action) => { })
        builder.addCase(postAddress.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(postAddress.fulfilled, (state, action) => {
            const {status , addresses, error} = action.payload;
            const myAddress = [...state.address]
            if(status) {
            state.loading = false;
            state.isAuthenticated = true;
            let updateAddress = myAddress.concat(addresses);
            state.address = updateAddress;
            }else {
                state.error = error
            }
        })
        builder.addCase(postAddress.rejected, (state, action) => {})
        builder.addCase(getAddressByCusId.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(getAddressByCusId.fulfilled, (state, action) => {
            const { status, address} = action.payload;
            if(address){
                if(status)
                {
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.address = address;
                }
            }
        })
        builder.addCase(getAddressByCusId.rejected, (state, action) => {})
        builder.addCase(editCusAddress.pending,(state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(editCusAddress.fulfilled,(state, action) => {
            const {status, Message, editedAddress, error} = action.payload;
            if(status){
                state.loading = false;
                state.isAuthenticated = true;
                state.singleaddress = editedAddress;
                state.updateAddressMessage = Message;
            }else {
                state.error = error
            }
        })
        builder.addCase(editCusAddress.rejected,(state, action) => {})
        builder.addCase(getSingleAdd.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(getSingleAdd.fulfilled,(state, action) => {
            const {status, address, error} = action.payload;
            console.log(address);
            if(status){
                state.loading = false;
                state.isAuthenticated = true;
                state.singleaddress = address;
            }else {
                state.error = error;
            }
        })
        builder.addCase(getSingleAdd.rejected, (state, action) => {})
        builder.addCase(editCusProfile.pending, (state, action) => {
            state.error = false;
            state.updateMessage = "";
            state.loading = true;
        })
        builder.addCase(editCusProfile.fulfilled, (state, action) => {
            const { status, Message, updatedCustomer, error} =  action.payload;
            if(status){
                state.loading = false;
                state.isAuthenticated = true;
                state.updateMessage = Message;
                state.customer = updatedCustomer;
            }else{
                state.error = error;
            }
        })
        builder.addCase(editCusProfile.rejected, (state, action) => {})
        builder.addCase(delAddress.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(delAddress.fulfilled, (state, action) => {
            const {status, message, error} = action.payload;
            if(status){
                state.loading = false;
                state.isAuthenticated = true;
                state.isAddressDeleted = true;
            }else{
                state.error = error;
            }
        })
        builder.addCase(delAddress.rejected, (state, action) => {

        })
    }
})

export default loginSlice.reducer;
export const {updateSuccess, updateError, clearMessage} = loginSlice.actions;