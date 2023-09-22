import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const getUserDetail = createReducer(initialState, {
  // get user
  getCreditUserRequest: (state) => {
    state.isLoading = true;
  },
  getCreditUserSuccess: (state, action) => {
    state.isLoading = false;
    state.users = action.payload;
  },
  getCreditUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get withdram all of user
  getWithdramAllUserRequest: (state) => {
    state.isLoading = true;
  },
  getWithdramAllUserSuccess: (state, action) => {
    state.isLoading = false;
    state.userWithdram = action.payload;
  },
  getWithdramAllUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
   state.error = null;
 },

});