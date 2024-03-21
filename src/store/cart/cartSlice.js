import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = id
      console.log(state.cart.filter((itm) => itm.pizzaId !== action.payload));
      state.cart = state.cart.filter((itm) => itm.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((itm) => itm.pizzaId === action.payload);
      item.quantity++;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((itm) => itm.pizzaId === action.payload);
      item.quantity--;
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

export const getTotalCartQty = (s) =>
  s.cart.cart.reduce((sum, itm) => sum + itm.quantity, 0);

export const getTotalCartPrice = (s) =>
  s.cart.cart.reduce((sum, itm) => sum + itm.totalPrice * itm.quantity, 0);

export const getCart = (s) => s.cart.cart;

export const getCurrentQtyById = (id) => (state) =>
  state.cart.cart.find((itm) => itm.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
