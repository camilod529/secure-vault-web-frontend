import { Currency } from "../interfaces/currency.enum";

export const transformToLegibleNumber = (amount: number, currency: Currency): string => {
  const aux = amount.toFixed(2);
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(parseFloat(aux));
};
