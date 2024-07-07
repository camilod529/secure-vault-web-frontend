import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "../pages";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={Home} />} />
      <Route path="/login" element={<PublicRoute element={Login} />} />
      <Route path="/register" element={<PublicRoute element={Register} />} />
    </Routes>
  );
};
