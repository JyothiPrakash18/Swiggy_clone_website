import { createSlice } from "@reduxjs/toolkit";
import { checkAuthToken } from "../apis/mainApis";

const initialState = {
    customer: {},
    error: false,
    success: false
}

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(checkAuthToken.fulfilled, (state, action) => {

            const { status, customer } = action?.payload;

            if (status) {
                state.success = true;
                state.customer = customer;
            }
            else state.error = 'TOKEN_INVALID'
        })
    }
});


export default mainSlice.reducer