import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { appApi } from "../api";
import { login, logout } from "../store/slices/auth/authSlice";

type returnType = {
  email: string;
  token: string;
  fullName: string;
  isAuthenticated: boolean;
  startLogin: ({ email, password }: { email: string; password: string }) => Promise<void>;
};

export const useAuthStore = (): returnType => {
  const { email, token, fullName, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await appApi.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(login(data));
    } catch (error) {
      const errorMessage = error.response.data.message || "An error occurred";
      dispatch(logout({}));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        timer: 2500,
      });
      console.log(error);
    }
  };

  return {
    //* Properties
    email,
    token,
    fullName,
    isAuthenticated,
    //* Methods
    startLogin,
  };
};
