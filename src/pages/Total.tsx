import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Transaction } from "../interfaces/transactionResponse.interface";
import { Currency } from "../interfaces/currency.enum";
import { useTransaction } from "../hooks";
import { transformToLegibleNumber } from "../helpers/transformToLegibleNumber";

export const Total: React.FC = () => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState<{ [key in Currency]?: number }>({});
  const { startLoadingTransactions } = useTransaction();

  useEffect(() => {
    startLoadingTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {t("View Total Money in Safe")}
        </h2>
        {Object.keys(totals).length === 0 ? (
          <p className="text-gray-500 text-center">{t("No transactions found.")}</p>
        ) : (
          <ul className="space-y-4">
            {Object.entries(totals).map(([currency, total]) => (
              <li
                key={currency}
                className="flex justify-between items-center text-lg text-gray-700"
              >
                <span className="font-medium">{currency}:</span>
                <span>{transformToLegibleNumber(total, currency as Currency)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col mt-6 space-y-4">
          <Link
            to="/transactions"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded text-center"
          >
            {t("View All Transactions")}
          </Link>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center"
          >
            {t("Go to Home")}
          </Link>
        </div>
      </div>
    </div>
  );
};
