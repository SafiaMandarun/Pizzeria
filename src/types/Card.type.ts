import type { Pizza } from "../models/Pizzeria.models";

export type CardProps = Pizza & {
  updateTotal: (diff: number) => void;
  updateQuantity: (pizzaId: number, quantity: number) => void;
};
