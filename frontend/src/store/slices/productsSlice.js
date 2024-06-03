import { createSlice } from "@reduxjs/toolkit";
import { addCartItem, decreaseCartItemQtys, getSingleProduct, increaseCartItemQtys, removeCartItem} from "../apis/productsApi";
import { chargesBasedOnBranch } from "../apis/chargesApi";

const initialState = {
  product: [],
  charges : [],
  items: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [],
  error: false,
  success: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateSuccess: (state, action) => {
      state.success = action.payload;
    },
    updateError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state, action) => {
        state.product = {};
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        const { status, product, error } = action.payload;
        if (status) {
          state.success = true;
          state.product = product;
        } else state.error = error;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {})
      .addCase(addCartItem.pending, (state) => {})
      .addCase(addCartItem.fulfilled, (state, action) => {
        const { product, status } = action.payload;
        console.log(action.payload);
        if (status) {
          const isItemExist = state.items.find(
            (item) => item._id === product._id
          );
          if (!isItemExist) {
            state.items = [...state.items, product];
            localStorage.setItem("cartItems", JSON.stringify(state.items));
          } else {
            alert("Product already exists");
          }
        }
      })
      .addCase(addCartItem.rejected, (state, action) => {})
      .addCase(increaseCartItemQtys.pending, (state) => {})
      .addCase(increaseCartItemQtys.fulfilled, (state, action) => {
        const { id, status, error } = action.payload;
        console.log(action.payload);
        let myItems = [...state.items];
        if (status) {
          let findIndexOfItem = myItems.findIndex((item) => item._id === id);
          let updatedItem = {
            ...myItems[findIndexOfItem],
            quantity: myItems[findIndexOfItem].quantity + 1,
          };
          myItems[findIndexOfItem] = updatedItem;
          localStorage.setItem("cartItems", JSON.stringify(myItems));
          state.items = myItems;
        } else {
          state.error = error;
        }
      })
      .addCase(increaseCartItemQtys.rejected, (state) => {})
      .addCase(decreaseCartItemQtys.pending, (state) => {})
      .addCase(decreaseCartItemQtys.fulfilled, (state, action) => {
        const { id, status, error } = action.payload;
        let myItems = [...state.items];
      
        if (status) {
          let findIndexOfItem = myItems.findIndex((item) => item._id === id);
          if (myItems[findIndexOfItem].quantity > 1) {
            let updatedItem = {
              ...myItems[findIndexOfItem],
              quantity: myItems[findIndexOfItem].quantity - 1,
            };
            myItems[findIndexOfItem] = updatedItem;
          } else {
            // If quantity is 1, remove the item from the cart
            myItems = myItems.filter((item) => item._id !== id);
          }
      
          localStorage.setItem("cartItems", JSON.stringify(myItems));
          state.items = myItems;
        } else {
          state.error = error;
        }
      })
      
      .addCase(decreaseCartItemQtys.rejected, (state) => {})
      .addCase(removeCartItem.pending, (state) => {})
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const { id, status, error } = action.payload;
        if (status) {
            if (id === 'all') {
                // If id is 'all', clear all items from the cart
                localStorage.removeItem("cartItems");
                state.items = [];
            } else {
                // Remove the specific item from the cart
                const filterItems = state.items.filter((item) => item.product !== id);
                localStorage.setItem("cartItems", JSON.stringify(filterItems));
                state.items = filterItems;
            }
        } else {
            state.error = error;
        }
    })
      .addCase(removeCartItem.rejected, (state) => {})
      .addCase(chargesBasedOnBranch.pending, (state) => {})
      .addCase(chargesBasedOnBranch.fulfilled, (state, action) => {
        const {status, charges, error} = action.payload;
        if(status){
          state.success = true;
          state.charges = charges;
        }
        else{
          state.error = error;
        }
      })
      .addCase(chargesBasedOnBranch.rejected, (state, action) => {})

  },
});

export const { updateSuccess, updateError } = productsSlice.actions;
export default productsSlice.reducer;
