import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Transaction } from "../interfaces/transactionResponse.interface";
import { Currency } from "../interfaces/currency.enum";
import { envs } from "../config/envs";
import { Link } from "react-router-dom";

export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const apiUrl = envs.API_URL;
  const fetchUrl = `${apiUrl}/transactions`;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          data.sort((a: Transaction, b: Transaction) => (a.created_at > b.created_at ? -1 : 1));
          setTransactions(data);
        } else {
          console.error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token, fetchUrl]);

  const getCurrenciesTotal = (currency: Currency): number => {
    return transactions.reduce((total, transaction) => {
      if (transaction.currency === currency) {
        return total + transaction.amount;
      } else {
        return total;
      }
    }, 0);
  };

  const isNegative = (total: number): boolean => {
    return total < 0;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl mb-8">
        <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Currency Totals</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {Object.values(Currency).map((currency) => (
            <div
              key={currency}
              className={`p-4 flex justify-between items-center ${
                isNegative(getCurrenciesTotal(currency)) ? "bg-red-100" : ""
              }`}
            >
              <div>
                <p className="text-gray-800 text-lg font-semibold">{currency}</p>
                <p className="text-gray-600">Total: {getCurrenciesTotal(currency).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">All Transactions</h2>
          <p className="text-sm text-gray-500">
            Total: {transactions.length}{" "}
            {transactions.length === 1 ? "transaction" : "transactions"}
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.length === 0 ? (
            <p className="p-4 text-gray-500 text-center">No transactions found.</p>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`p-4 flex items-center ${transaction.amount < 0 ? "bg-red-100" : ""}`}
              >
                <div className="flex-1">
                  <p className="text-gray-800 text-lg font-semibold">{transaction.name}</p>
                  <p className="text-gray-600">
                    {transaction.amount} {transaction.currency}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Created by: {transaction.createdBy.fullName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Created at: {new Date(transaction.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
          <div className="p-4 flex justify-center">
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
