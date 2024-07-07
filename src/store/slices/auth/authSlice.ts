import { createSlice, Slice } from "@reduxjs/toolkit";

export interface authState {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const initialState: authState = {
  email: "",
  password: "",
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
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
