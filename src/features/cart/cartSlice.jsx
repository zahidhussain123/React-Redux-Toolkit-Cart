import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cart: cartItems,
  amount: 5,
  total: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      // state.cart = [];
      return { cart: [] };
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    addItem: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      cartItem.amount = cartItem.amount + 1;
    },

    reduceItem: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      cartItem.amount = cartItem.amount - 1;
    },
  },
});

console.log("cartSlice", cartSlice);
export const { clearCart, removeItem, addItem, reduceItem } = cartSlice.actions;
export default cartSlice.reducer;
