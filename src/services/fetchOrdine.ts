import type { TableOrderResponse } from "../models/Pizzeria.models";
import { BASE_URL } from "./fetchPizze";

export const fetchOrdini = async (
  table_number: number
): Promise<TableOrderResponse[]> => {
  const res = await fetch(`${BASE_URL}/tables/${table_number}/orders`);
  if (!res.ok) {
    throw new Error("Errore nel recupero degli ordini");
  }
  return res.json();
};
