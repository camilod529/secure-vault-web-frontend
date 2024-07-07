import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { appApi } from "../api";
import { login, logout } from "../store/slices/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type returnType = {
  email: string;
  token: string;
  fullName: string;
  isAuthenticated: boolean;
  startLogin: ({ email, password }: { email: string; password: string }) => Promise<void>;
  startRegister: ({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }) => Promise<void>;
  startLogout: () => void;
};

export const useAuthStore = (): returnType => {
  const { email, token, fullName, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await appApi.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(login(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        console.error("Axios error:", error.response?.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
          timer: 2500,
        });
      } else {
        console.error("Error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred",
          timer: 2500,
        });
      }
      dispatch(logout({}));
    }
  };

  const startRegister = async ({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    try {
      const { data } = await appApi.post("/auth/register", { email, password, fullName });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(login(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        console.error("Axios error:", error.response?.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
          timer: 2500,
        });
      } else {
        console.error("Error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred",
          timer: 2500,
        });
      }
    }
  };

  const startLogout = () => {
    dispatch(logout({}));
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    navigate("/login");
  };

  return {
    //* Properties
    email,
    token,
    fullName,
    isAuthenticated,
    //* Methods
    startLogin,
    startRegister,
    startLogout,
  };
};
