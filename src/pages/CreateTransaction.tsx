import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Currency } from "../interfaces/currency.enum";
import { envs } from "../config/envs";

export const CreateTransaction: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [currency, setCurrency] = useState<Currency>(Currency.COP);
  const apiUrl = envs.API_URL;
  const fetchUrl = `${apiUrl}/transactions`;

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          amount,
          currency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Transaction created successfully!");
        setName("");
        setAmount("");
        setCurrency(Currency.COP);
      } else {
        alert("Failed to create transaction");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Transaction</h2>
      <form onSubmit={handleCreateTransaction}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            id="currency"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            required
          >
            {Object.values(Currency).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 mx-auto"
          >
            Create Transaction
          </button>
        </div>
      </form>

      <div className="flex justify-between mt-4">
        <Link
          to="/transactions"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          View All Transactions
        </Link>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};
