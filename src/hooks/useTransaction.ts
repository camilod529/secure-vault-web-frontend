import Swal from "sweetalert2";
import { appApi } from "../api";
import { Transaction } from "../interfaces/transactionResponse.interface";

export const useTransaction = () => {
  const startLoadingTransactions = async () => {
    let transactions: Transaction[] = [];
    try {
      const response = await appApi.get("/transactions");
      const data: Transaction[] = response.data;
      data.sort((a: Transaction, b: Transaction) => (a.created_at > b.created_at ? -1 : 1));
      transactions = data;
    } catch (error) {
      console.error("Error occurred:", error);
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
        title: "Transaction created successfully",
      });
    } catch (error) {
      console.error("Error occurred:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Please try again",
      });
    }
  };

  return { startLoadingTransactions, startCreatingTransaction };
};
