import type { Pizza } from "./Pizzeria.models";

export type CardProps = Pizza & {
  updateTotal: (diff: number) => void;
};
