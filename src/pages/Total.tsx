import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Transaction } from "../interfaces/transactionResponse.interface";
import { Currency } from "../interfaces/currency.enum";
import { useTransaction } from "../hooks";

export const Total: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState<{ [key in Currency]?: number }>({});
  const { startLoadingTransactions } = useTransaction();

  useEffect(() => {
    startLoadingTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, [startLoadingTransactions]);

  useEffect(() => {
    const calculateTotals = () => {
      const totals: { [key in Currency]?: number } = {
        [Currency.COP]: 0,
        [Currency.USD]: 0,
        [Currency.MXN]: 0,
      };
      transactions.forEach((transaction) => {
        if (totals[transaction.currency as Currency] !== undefined) {
          totals[transaction.currency as Currency]! += transaction.amount;
        }
      });
      setTotals(totals);
    };

    calculateTotals();
  }, [transactions]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Total Money in Safe</h2>
        {Object.keys(totals).length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <ul>
            {Object.entries(totals).map(([currency, total]) => (
              <li key={currency} className="text-lg text-gray-700">
                {currency}: {total}
              </li>
            ))}
          </ul>
        )}
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
