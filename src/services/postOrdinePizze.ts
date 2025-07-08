import { BASE_URL } from "./fetchPizze";

export const postOrdinePizze = async (
  table_number: number,
  ordine: { pizza_id: number; quantity: number }[]
) => {
  try {
    const response = await fetch(`${BASE_URL}/tables/${table_number}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ordine),
    });

    if (!response.ok) throw new Error("Errore durante l'invio dell'ordine");

    return {
      success: true,
      message: "Ordine inviato con successo!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Errore durante l'invio dell'ordine. Riprova.",
    };
  }
};
