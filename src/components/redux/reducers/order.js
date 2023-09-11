import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  // get all orders of user
  getAllOrdersUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get one orders of user
  getOrdersOneUserRequest: (state) => {
    state.isLoading = true;
  },
  getOrdersOneUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orderone = action.payload;
  },
  getOrdersOneUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get All orders of shop
  getOrdersAllShopRequest: (state) => {
    state.isLoading = true;
  },
  getOrdersAllShopSuccess: (state, action) => {
    state.isLoading = false;
    state.orderoneshop = action.payload;
  },
  getOrdersAllShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get orders book all of shop
  getOrdersBookAllShopRequest: (state) => {
    state.isLoading = true;
  },
  getOrdersBookAllShopSuccess: (state, action) => {
    state.isLoading = false;
    state.orderbookoneshop = action.payload;
  },
  getOrdersBookAllShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get receiptDetail 
  getReceiptDetailRequest: (state) => {
    state.isLoading = true;
  },
  getReceiptDetailSuccess: (state, action) => {
    state.isLoading = false;
    state.receiptDetail = action.payload;
  },
  getReceiptDetailFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
   state.error = null;
 },
});