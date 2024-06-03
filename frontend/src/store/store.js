import { configureStore } from "@reduxjs/toolkit";
import branchesSlice from "./slices/branchesSlice";
import productsSlice from "./slices/productsSlice";
import loginSlice from "./slices/loginSlice";
import mainSlice from "./slices/mainSlice";
import ordersSlice from "./slices/ordersSlice";


const store = configureStore({
    reducer : {
        branches : branchesSlice,
        products: productsSlice,
        login : loginSlice,
        main : mainSlice,
        orders : ordersSlice
    }
})

export default store;
