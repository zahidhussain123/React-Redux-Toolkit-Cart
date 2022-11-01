import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

export const STATUSES = Object.freeze({
  LOADING: "loading",
  IDLE: "idle",
  ERROR: "error",
});

const initialState = {
  cart: [],
  amount: 0,
  total: 0,
  status: STATUSES.IDLE,
};

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartData = createAsyncThunk("cart/fetch", async () => {
  const result = await fetch(url);
  const data = await result.json();
  return data;
});

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

    calculateTotal: (state, action) => {
      let amount = 0;
      let total = 0;
      state.cart.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartData.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.cart = action.payload;
      })
      .addCase(getCartData.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

console.log("cartSlice", cartSlice);
export const { clearCart, removeItem, addItem, reduceItem, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
