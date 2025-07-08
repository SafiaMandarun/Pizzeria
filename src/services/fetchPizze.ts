import type { Pizza } from "../models/Pizzeria.models";

export const BASE_URL = "https://d1r0oonpv5yocu.cloudfront.net/api";
const fetchPizze = async () => {
  const res = await fetch(`${BASE_URL}/pizzas`);
  if (!res.ok) {
    throw new Error("Errore nell'ottenimento dei dati");
  }
  const data: Pizza[] = await res.json();
  return data;
};

export default fetchPizze;
