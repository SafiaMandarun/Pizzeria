import { useEffect, useState } from "react";
import fetchPizze from "../services/fetchPizze";
import type { Pizza } from "../models/Pizzeria.models";

export const useFetchPizze = () => {
  const [pizze, setEq] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPizze()
      .then((data) => {
        setEq(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { pizze, loading };
};
