import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, CreateTransaction, Transactions, Total } from "../pages";
import { ProtectedRoute, PublicRoute } from "../components";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={Home} />} />
      <Route path="/login" element={<PublicRoute element={Login} />} />
      <Route path="/register" element={<PublicRoute element={Register} />} />
      <Route path="/create-transaction" element={<ProtectedRoute element={CreateTransaction} />} />
      <Route path="/transactions" element={<ProtectedRoute element={Transactions} />} />
      <Route path="/total" element={<ProtectedRoute element={Total} />} />
    </Routes>
  );
};
