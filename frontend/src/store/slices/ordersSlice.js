import { createSlice } from "@reduxjs/toolkit";
import { createOrder, userOrdersList } from "../apis/ordersApis";

const initialState = {
    userOrders : {},
    orderDetail : {},
    error : false, 
    loading : false,
    Message : ""
}

const orderSlice = createSlice({
    name : 'orders',
    initialState, 
    reducers : {
        updateSuccess: (state, action) => {
            state.success = action.payload
        },
        updateError: (state, action) => {
            state.error = action.payload
        },
        clearMessage : (state, action) => {
            state.Message =""
        }
    },
    extraReducers : (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            const {status, order, error, Message} = action.payload
            if(status){
                state.loading = false;
                state.isAuthenticated = true;
                state.userOrders = order;
                state.Message = Message;
            }else {
                state.error = error;
            }
        })
        builder.addCase(createOrder.rejected, (state, action) => {})
        builder.addCase(userOrdersList.pending , (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(userOrdersList.fulfilled , (state, action) => {
            const { status, orders, message} = action.payload;
            if(status){
                state.loading = false;
                state.isAuthenticated = true;
                state.userOrders = orders;
            }else{
                state.error = message;
            }
        })
        builder.addCase(userOrdersList.rejected , (state, action) => {})

    }
})

export default orderSlice.reducer;
export const {updateSuccess, updateError, clearMessage} = orderSlice.actions;
