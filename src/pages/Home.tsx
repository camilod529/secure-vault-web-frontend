import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useAuthStore } from "../hooks";

export const Home: React.FC = () => {
  const fullName = useSelector((state: RootState) => state.auth.fullName);
  const { startLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleCreateTransaction = () => {
    navigate("/create-transaction");
  };

  const handleViewTransactions = () => {
    navigate("/transactions");
  };

  const handleViewTotal = () => {
    navigate("/total");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Home</h1>
        {fullName ? (
          <p className="text-gray-700 mb-6">Welcome, {fullName}!</p>
        ) : (
          <p className="text-gray-700 mb-6">Welcome!</p>
        )}
        <button
          onClick={handleCreateTransaction}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4"
        >
          Create New Transaction
        </button>
        <button
          onClick={handleViewTransactions}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mb-4"
        >
          View All Transactions
        </button>
        <button
          onClick={handleViewTotal}
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 mb-4"
        >
          View Total Money in Safe
        </button>
        <button
          onClick={startLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
