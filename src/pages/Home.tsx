import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Home: React.FC = () => {
  const fullName = useSelector((state: RootState) => state.auth.fullName);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Home</h1>
        {fullName ? (
          <p className="text-gray-700">Welcome, {fullName}!</p>
        ) : (
          <p className="text-gray-700">Welcome!</p>
        )}
      </div>
    </div>
  );
};
