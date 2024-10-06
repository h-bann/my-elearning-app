import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketCount: 0,
  basketItems: [],
  basketError: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketItems: (state, { payload }) => {
      const duplicate = state.basketItems.find((item) => {
        return item.id === payload[0].id;
      });
      if (duplicate) {
        state.basketError = true;
        return;
      }
      state.basketError = false;
      state.basketItems.push(payload[0]);
      state.basketCount = state.basketCount + payload[1];
    },
    setBasketError: (state, { payload }) => {
      state.basketError = payload;
    },
    setDeleteBasketItem: (state = initialState.basketItems, { payload }) => {
      state.basketItems = state.basketItems.filter(
        (item) => item.id !== payload
      );
      state.basketCount = state.basketCount - 1;
    },
    setEmptyBasket: (state, { payload }) => {
      state.basketItems = [];
      state.basketCount = 0;
    },
  },
});

export const {
  setBasketItems,
  setBasketError,
  setDeleteBasketItem,
  setEmptyBasket,
} = basketSlice.actions;

// * this is how you retrieve from store

export const selectBasketCount = (state) => state.basket.basketCount;
export const selectBasketItems = (state) => state.basket.basketItems;
export const selectBasketError = (state) => state.basket.basketError;

export default basketSlice.reducer;
