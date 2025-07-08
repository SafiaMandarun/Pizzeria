import { useEffect, useState } from "react";
import fetchPizze from "../services/fetchPizze";
import type { Pizza, TableOrderResponse } from "../models/Pizzeria.models";
import { fetchOrdini } from "../services/fetchOrdine";
import { useNavigate, useParams } from "react-router";

const Order = () => {
  const [pizze, setPizze] = useState<Pizza[]>([]);
  const [ordini, setOrdini] = useState<TableOrderResponse[]>([]);
  const [caricamento, setCaricamento] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const caricaDati = async () => {
      try {
        setCaricamento(true);
        const menu = await fetchPizze();
        const ordiniTavolo = await fetchOrdini(Number(id));
        setPizze(menu);
        const ordiniOrdinati = ordiniTavolo.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setOrdini(ordiniOrdinati);
      } catch (err) {
        console.error("Errore nel caricamento dati:", err);
      } finally {
        setCaricamento(false);
      }
    };

    caricaDati();
  }, [id]);

  if (caricamento)
    return <p className="text-center text-gray-500">Caricamento...</p>;
  console.log(ordini, "ORDINIIII");

  const totaleTavolo = ordini.reduce((totale, ordine) => {
    const pizza = pizze.find((p) => p.id === ordine.pizza_id);
    return pizza ? totale + pizza.price * ordine.quantity : totale;
  }, 0);
  console.log(totaleTavolo);

  return (
    <div className=" mx-auto ">
      <div className="w-full h-14 text-gray-800 text-center flex justify-between px-5 py-12 items-center rounded bg-white fixed top-0 shadow-md">
        <button
          className="font-bold text-white py-2 px-4 bg-amber-600 hover:bg-amber-700 rounded"
          onClick={() => navigate(`/${id}/menu`)}
        >
          {" < Menu"}
        </button>
        <span className="text-center font-bold text-4xl px-5 md:px-10 py-2">
          Ordine del Tavolo {id}
        </span>
        <button
          className="font-bold text-white py-2 px-4 bg-amber-600 hover:bg-amber-700 rounded"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto my-32">
        {ordini.map((ordine) => {
          const pizza = pizze.find((p) => p.id === ordine.pizza_id);
          if (!pizza) return null;

          const totale = ordine.quantity * pizza.price;

          return (
            <div
              key={ordine.id}
              className="flex items-center gap-4 border rounded-xl shadow p-4 bg-white"
            >
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{pizza.name}</h3>
                <p className="text-gray-600">Quantità: {ordine.quantity}</p>
                <p className="text-gray-600">
                  Prezzo unitario: €{pizza.price.toFixed(2)}
                </p>
                <p className="text-black font-medium">
                  Totale: €{totale.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
        <div className="mt-8 text-right">
          <p className="text-xl font-bold text-gray-800">
            Totale Tavolo: €{totaleTavolo.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
