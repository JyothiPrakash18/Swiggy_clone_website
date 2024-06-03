import { createSlice } from "@reduxjs/toolkit";
import { getBranchInfo, getBranches, getProductsByBranch, singleBranchInfo } from "../apis/branchesApis";

const initialState = {
    branches: [],
    branchInfo : [],
    singleBranchInfos : [],
    category: [],
    subCategory: [],
    products : [],
    orders: [],
    success: false,
    error: false
}

const branchesSlice = createSlice({
    name : 'branches',
    initialState,
    reducers : {
        updateSuccess: (state, action) => {
            state.success = action.payload
        },

        updateError: (state, action) => {
            state.error = action.payload
        }

    },
        extraReducers : (builder) => {
            builder.addCase(getBranches.pending, (state) => {
                state.branches = [];
            })
            builder.addCase(getBranches.fulfilled, (state, action) => {
                const { status, branches, error, resPerPage, count } = action.payload;
                if (status) {
                  state.success = true;
                  state.branches = branches;
                  state.resPerPage = resPerPage;
                  state.branchesCount = count;
                } else state.error = error;
            })
            builder.addCase(getBranches.rejected, (state, action) => {})
            builder.addCase(getBranchInfo.pending, (state) => {
                state.branchInfo = [];
            })
            builder.addCase(getBranchInfo.fulfilled , (state, action) => {
                const {status , finalResultSet} = action.payload;
                if(status){
                    const {cat, subCat, prod} = finalResultSet;
                    // console.log(cat, subCat, prod)
                    if(Object.keys(cat).length > 0) state.category = JSON.parse(cat)
                    if(Object.keys(cat).length > 0) state.subCategory = JSON.parse(subCat)
                    if(Object.keys(cat).length > 0) state.products = JSON.parse(prod)
                }
            })
            builder.addCase(getBranchInfo.rejected, (state,action) => {})
            builder.addCase(getProductsByBranch.pending, (state, action) => {
                state.products = [];
            })
            builder.addCase(getProductsByBranch.fulfilled, (state, action) => {
                const {status, products} = action.payload;
                if(status){
                  state.success = true;
                  state.products = products
                }
            })
            builder.addCase(getProductsByBranch.rejected, (state, action) => {})
            builder.addCase(singleBranchInfo.pending, (state) => {})
            builder.addCase(singleBranchInfo.fulfilled, (state, action) => {
                const { status, branches } = action.payload;
                if (status) {
                    // Find the order corresponding to the fetched branch
                    const orderToUpdate = state.orders.find(order => order.branchId === branches._id);
                    if (orderToUpdate) {
                        // Update the order with the fetched branch information
                        orderToUpdate.branchInfo = branches;
                    }
                }
            });
            builder.addCase(singleBranchInfo.rejected, (state, action) => {})
    }
})

export default branchesSlice.reducer;
export const {  updateSuccess, updateError} = branchesSlice.actions;