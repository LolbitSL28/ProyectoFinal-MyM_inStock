import { createSlice } from "@reduxjs/toolkit";
import { actLogin } from "../actions/authActions";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(actLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});
export const authReducer = authSlice.reducer;
export const { setToken } = authSlice.actions;
