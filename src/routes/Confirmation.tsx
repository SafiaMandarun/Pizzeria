import React from "react";
import { useNavigate, useParams } from "react-router";

const Confirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-amber-50 text-gray-800 p-6">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-amber-600">
          Inviato in cucina!
        </h1>
        <p className="text-lg font-medium">
          Tavolo <span className="font-bold">{id}</span>, il tuo ordine sarà
          pronto tra circa <span className="font-bold">15 minuti</span>.
        </p>
        <p className="text-gray-600">
          Mentre aspetti, puoi ordinare altre pizze se vuoi!
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate(`/${id}/order`)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition"
          >
            Vedi il tuo ordine
          </button>
          <button
            onClick={() => navigate(`/${id}/menu`)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition"
          >
            Torna alla Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
