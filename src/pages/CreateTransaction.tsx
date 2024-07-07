import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Currency } from "../interfaces/currency.enum";
import { envs } from "../config/envs";
import Swal from "sweetalert2";

export const CreateTransaction: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [currency, setCurrency] = useState<Currency>(Currency.COP);
  const [transactionType, setTransactionType] = useState<"Income" | "Expense">("Income"); // Estado para el tipo de transacción
  const apiUrl = envs.API_URL;
  const fetchUrl = `${apiUrl}/transactions`;

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const amountValue =
        transactionType === "Income"
          ? Math.abs(parseFloat(amount as string))
          : -Math.abs(parseFloat(amount as string));

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          amount: amountValue,
          currency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Transaction created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setName("");
        setAmount("");
        setCurrency(Currency.COP);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to create transaction",
          text: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to create transaction",
        text: "Please try again later.",
      });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value === "" ? "" : parseFloat(e.target.value));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Transaction</h2>
        <form onSubmit={handleCreateTransaction} className="space-y-4">
          <div>
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
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={amount === "" ? "" : amount.toString()} // Convertir amount a cadena explícitamente
              onChange={handleAmountChange}
              min="0" // Para permitir solo valores positivos
              required
            />
          </div>
          <div>
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">
              Transaction Type
            </label>
            <select
              id="transactionType"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as "Income" | "Expense")}
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div>
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
    </div>
  );
};
