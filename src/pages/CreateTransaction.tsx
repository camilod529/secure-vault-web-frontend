import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Currency } from "../interfaces/currency.enum";

import { useForm, useTransaction } from "../hooks";
import Swal from "sweetalert2";

const initialFormValue = {
  name: "",
  amount: "",
};

export const CreateTransaction: React.FC = () => {
  const { t } = useTranslation();
  const { name, amount, onInputChange, onResetForm } = useForm(initialFormValue);
  const [currency, setCurrency] = useState<Currency>(Currency.COP);
  const [transactionType, setTransactionType] = useState<"Income" | "Expense">("Income"); // Estado para el tipo de transacción
  const { startCreatingTransaction } = useTransaction();

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const numberAmamount =
      transactionType === "Income"
        ? Math.abs(parseFloat(amount as string))
        : -Math.abs(parseFloat(amount as string));
    if (numberAmamount === 0)
      return Swal.fire({
        icon: "error",
        title: t("Amount is required"),
      });

    if (isNaN(numberAmamount))
      return Swal.fire({
        icon: "error",
        title: t("Amount must be a number"),
      });

    startCreatingTransaction({
      name,
      amount: numberAmamount,
      currency,
    });
    onResetForm();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t("Create Transaction")}</h2>
        <form onSubmit={handleCreateTransaction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t("Name")}
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={name}
              name="name"
              onChange={onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              {t("Amount")}
            </label>
            <input
              type="number"
              id="amount"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={amount === "" ? "" : amount.toString()} // Convertir amount a cadena explícitamente
              name="amount"
              onChange={onInputChange}
              min="0" // Para permitir solo valores positivos
              required
            />
          </div>
          <div>
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">
              {t("Transaction Type")}
            </label>
            <select
              id="transactionType"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as "Income" | "Expense")}
              required
            >
              <option value="Income">{t("Income")}</option>
              <option value="Expense">{t("Expense")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
              {t("Currency")}
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
              {t("Create Transaction")}
            </button>
          </div>
        </form>

        <div className="flex justify-between mt-4">
          <Link
            to="/transactions"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            {t("View All Transactions")}
          </Link>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            {t("Go to Home")}
          </Link>
        </div>
      </div>
    </div>
  );
};
