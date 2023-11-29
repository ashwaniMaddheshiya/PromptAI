import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  userInfo: storedUser || {},
  token: storedToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log("From reducer", state.userInfo);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearUserInfo: (state, action) => {
      state.userInfo = {};
    },
    clearToken: (state, action) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUserInfo, setToken, clearToken, clearUserInfo } =
  authSlice.actions;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
