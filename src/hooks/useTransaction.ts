import Swal from "sweetalert2";
import { appApi } from "../api";
import { Transaction } from "../interfaces/transactionResponse.interface";
import { useTranslation } from "react-i18next"; // 1. Importa useTranslation

export const useTransaction = () => {
  const { t } = useTranslation(); // 2. Usa useTranslation para acceder a las traducciones

  const startLoadingTransactions = async () => {
    let transactions: Transaction[] = [];
    try {
      const response = await appApi.get("/transactions");
      const data: Transaction[] = response.data;
      data.sort((a: Transaction, b: Transaction) => (a.created_at > b.created_at ? -1 : 1));
      transactions = data;
    } catch (error) {
      console.error("Error occurred:", error);
      Swal.fire({
        icon: "error",
        title: t("An error occurred"),
        text: t("Please try again"),
      });
    }

    return transactions;
  };

  const startCreatingTransaction = async (transaction: {
    name: string;
    amount: number;
    currency: string;
  }) => {
    try {
      await appApi.post("/transactions", transaction);
      Swal.fire({
        icon: "success",
        title: t("Transaction created successfully"),
      });
    } catch (error) {
      console.error("Error occurred:", error);
      Swal.fire({
        icon: "error",
        title: t("An error occurred"),
        text: t("Please try again"),
      });
    }
  };

  return { startLoadingTransactions, startCreatingTransaction };
};
