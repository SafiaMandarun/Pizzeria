import { useNavigate, useParams } from "react-router";
import { useFetchPizze } from "../hooks/useFetchPizze";
import { useState } from "react";
import Card from "../components/Card";
import { postOrdinePizze } from "../services/postOrdinePizze";

const Menu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pizze } = useFetchPizze();

  const [total, setTotal] = useState(0);
  const [quantitàPizze, setQuantitàPizze] = useState<{ [id: number]: number }>(
    {}
  );

  const updateTotal = (diff: number) => {
    setTotal((prev) => prev + diff);
  };

  const updateQuantity = (pizzaId: number, quantity: number) => {
    setQuantitàPizze((prev) => ({
      ...prev,
      [pizzaId]: quantity,
    }));
  };

  const handleSubmit = async () => {
    const ordine = Object.entries(quantitàPizze).reduce(
      (acc, [pizza_id, quantity]) => {
        if (quantity > 0) {
          acc.push({ pizza_id: +pizza_id, quantity });
        }
        return acc;
      },
      [] as { pizza_id: number; quantity: number }[]
    );

    if (ordine.length === 0) {
      alert("Nessuna pizza selezionata.");
      return;
    }

    const result = await postOrdinePizze(Number(id), ordine);

    if (result.success) {
      navigate(`/${id}/confirmation`);
    } else {
      alert(result.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-5">
      <div className="w-full h-14 text-gray-800 text-center flex justify-between px-5 py-12 items-center rounded bg-white fixed top-0 shadow-md">
        <button
          className="font-bold text-white py-2 px-4 bg-amber-600 hover:bg-amber-700 rounded"
          onClick={() => navigate("/")}
        >
          {"<"}
        </button>
        <span className="text-center font-bold text-4xl px-5 md:px-10 py-2">
          Tavolo {id}
        </span>
        <button
          className="font-bold text-white py-2 px-4 bg-amber-600 hover:bg-amber-700 rounded"
          onClick={() => navigate(`/${id}/order`)}
        >
          Il tuo Ordine
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 my-24">
        {pizze.map((pizza) => (
          <Card
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            description={pizza.description}
            ingredients={pizza.ingredients}
            price={pizza.price}
            image={pizza.image}
            updateTotal={updateTotal}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 px-6 shadow-lg flex justify-between items-center z-50">
        <span className="text-xl font-semibold">Totale: £ {total}</span>
        <button
          onClick={handleSubmit}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Conferma Ordine
        </button>
      </div>
    </div>
  );
};

export default Menu;
