import { createSlice, Slice } from "@reduxjs/toolkit";

export interface authState {
  email: string;
  isAuthenticated: boolean;
  fullName: string;
  token: string;
}

const initialState: authState = {
  email: "",
  token: "",
  fullName: "",
  isAuthenticated: false,
};

export const authSlice: Slice<authState> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = "";
      state.isAuthenticated = false;
      state.token = "";
      state.fullName = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
