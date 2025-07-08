import { useState } from "react";
import type { CardProps } from "../types/Card.type";

const Card = ({
  id,
  name,
  description,
  ingredients,
  price,
  image,
  updateTotal,
  updateQuantity,
}: CardProps) => {
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleUpdate = (newQty: number) => {
    const diff = (newQty - quantity) * price;
    setQuantity(newQty);
    updateTotal(diff);
    updateQuantity(id, newQty);
  };

  return (
    <div className="flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img
          className="rounded-t-lg w-full "
          src={image}
          alt={`Foto della pizza ${name}`}
        />
        <div className="flex justify-between items-start p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <span className="mb-3 font-semibold text-gray-700 dark:text-gray-400 shrink-0">
            £ {price}
          </span>
        </div>

        <p className="mb-2 font-normal text-gray-600 dark:text-gray-300 px-5 text-sm">
          {description}
        </p>
        <p className="mb-3 font-light  text-gray-600 dark:text-gray-300 px-5 text-sm mt-6">
          <span className="font-bold"> Ingredienti: </span> {ingredients}
        </p>
      </div>

      {showQuantity ? (
        <div className="flex justify-center gap-4 my-4">
          <button
            className="bg-orange-300 hover:bg-amber-400 px-3 py-1 text-black rounded disabled:bg-gray-300"
            onClick={() => handleUpdate(quantity - 1)}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className="text-white font-bold">{quantity}</span>
          <button
            className="bg-orange-300 hover:bg-amber-400 px-3 py-1 text-black rounded"
            onClick={() => handleUpdate(quantity + 1)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowQuantity(true)}
          className="mx-auto px-4 py-2 mb-4 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg"
        >
          Ordina
        </button>
      )}
    </div>
  );
};

export default Card;
