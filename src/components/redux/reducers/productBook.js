import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productBookReducer = createReducer(initialState, {

    getOneProductsBookRequest: (state) => {
      state.isLoading = true;
    },
    getOneProductsBookSuccess: (state, action) => {
      state.isLoading = false;
      state.bookonepayment = action.payload;
    },
    getOneProductsBookFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },


})