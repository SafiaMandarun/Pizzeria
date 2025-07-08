import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d{0,3}$/.test(event.target.value)) {
      setInputValue(event.target.value);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen text-center text-white">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://media.printables.com/media/prints/1081392/images/8175908_ae65b516-2705-4777-871f-a12fa51738b8_fe07881d-4557-4bb4-8b0c-ff9685b9e6c7/thumbs/inside/1280x960/png/captura-de-tela-2024-11-20-071059.webp"
        alt="sfondo pizzeria"
      />

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Contenuto */}
      <div className="relative z-10 max-w-md w-full bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-white drop-shadow mb-4">
          Freddy's Pizzeria
        </h1>

        <p className="text-md text-gray-300 mb-6">
          Mangia in compagnia di Freddy!
        </p>

        <div className="text-left">
          <label
            htmlFor="numero_tavolo"
            className="block mb-2 text-sm font-medium text-white"
          >
            Numero Tavolo
          </label>
          <input
            onChange={handleInputChange}
            value={inputValue}
            type="text"
            name="numero_tavolo"
            id="numero_tavolo"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-700 block w-full p-3"
            placeholder="es: 888"
            maxLength={3}
            minLength={3}
            required
          />

          <button
            onClick={() => navigate(`/${inputValue}/menu`)}
            className={classNames(
              "w-full mt-6 px-6 py-3 font-semibold text-lg rounded-lg shadow-md transition cursor-pointer",
              {
                "bg-amber-600 hover:bg-amber-700 text-white":
                  inputValue.length === 3,
                "bg-gray-500 text-white cursor-not-allowed":
                  inputValue.length !== 3,
              }
            )}
            disabled={inputValue.length !== 3}
          >
            Inizia ad ordinare
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
