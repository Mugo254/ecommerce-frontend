import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: localStorage.getItem('id') || false,
  accessToken: localStorage.getItem('accessToken') || false,
  isLoggedIn: localStorage.getItem('id') ? true : false,
  darkMode: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.userId = localStorage.getItem('id');
      state.accessToken = localStorage.getItem('accessToken');
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = false;
      state.accessToken = false;
      toast.success("You have successfuly logout");
    },
   
  },
});

// console.log(cartSlice);
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
