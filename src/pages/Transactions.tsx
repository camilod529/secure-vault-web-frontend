import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Transaction } from "../interfaces/transactionResponse.interface";
import { Currency } from "../interfaces/currency.enum";
import { useTransaction } from "../hooks/useTransaction";

export const Transactions: React.FC = () => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { startLoadingTransactions } = useTransaction();

  useEffect(() => {
    startLoadingTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, [startLoadingTransactions]);

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
          <h2 className="text-xl font-semibold text-gray-800">{t("Currency Totals")}</h2>
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
                <p className="text-gray-600">
                  {t("Total")}: {getCurrenciesTotal(currency).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{t("All Transactions")}</h2>
          <p className="text-sm text-gray-500">
            {t("Total")}: {transactions.length}{" "}
            {transactions.length === 1 ? t("transaction") : t("transactions")}
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.length === 0 ? (
            <p className="p-4 text-gray-500 text-center">{t("No transactions found.")}</p>
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
                    {t("Created by")}: {transaction.createdBy.fullName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {t("Created at")}: {new Date(transaction.created_at).toLocaleString()}
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
              {t("Go to Home")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
