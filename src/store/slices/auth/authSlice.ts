import { createSlice, Slice } from "@reduxjs/toolkit";

export interface authState {
  email: string;
  password: string;
  isAuthenticated: boolean;
  token: string;
}

const initialState: authState = {
  email: "",
  password: "",
  token: "",
  isAuthenticated: false,
};

export const authSlice: Slice<authState> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
