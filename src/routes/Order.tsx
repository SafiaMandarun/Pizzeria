import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../services/fetchPizze";

interface OrderItem {
  id: number;
  table_number: number;
  pizza_id: number;
  quantity: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Pizza {
  id: number;
  name: string;
  price: number;
}

export const Order = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [pizze, setPizze] = useState<Record<number, Pizza>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tables/${id}/orders`);
        if (!res.ok) throw new Error("Errore fetch ordini");
        const data: OrderItem[] = await res.json();
        setOrders(data);

        // Se ci sono ordini, carico anche i dati delle pizze usate
        const pizzaIds = Array.from(new Set(data.map((o) => o.pizza_id)));
        const resPizze = await fetch(
          `${BASE_URL}/pizze?ids=${pizzaIds.join(",")}`
        );
        if (!resPizze.ok) throw new Error("Errore fetch pizze");
        const dataPizze: Pizza[] = await resPizze.json();
        setPizze(dataPizze.reduce((acc, p) => ({ ...acc, [p.id]: p }), {}));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  if (loading) return <div>Caricamento...</div>;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <p className="text-lg">Non hai ancora ordinato nulla.</p>
        <button
          onClick={() => navigate(`/${id}`)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Guarda il menu
        </button>
      </div>
    );
  }

  // Raggruppa quantità per pizza_id
  const grouped = orders.reduce<Record<number, number>>((acc, o) => {
    acc[o.pizza_id] = (acc[o.pizza_id] || 0) + o.quantity;
    return acc;
  }, {});

  const items = Object.entries(grouped).map(([pizzaIdStr, qty]) => {
    const pizzaId = +pizzaIdStr;
    const pizza = pizze[pizzaId];
    const total = pizza ? pizza.price * qty : 0;
    return {
      pizzaId,
      name: pizza?.name || `Pizza #${pizzaId}`,
      quantity: qty,
      total,
    };
  });

  const totalAll = items.reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Il tuo ordine</h2>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.pizzaId} className="flex justify-between border-b pb-2">
            <span>
              {i.name} x{i.quantity}
            </span>
            <span>£ {i.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between text-xl font-semibold">
        <span>Totale:</span>
        <span>£ {totalAll.toFixed(2)}</span>
      </div>
    </div>
  );
};
