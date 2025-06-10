import { useState } from "react";

type MutationProps = {
  id?: string;
  url: string;
  method: "POST" | "PATCH" | "DELETE";
  body?: any;
  headers?: HeadersInit;
};

function useMutation() {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const mutate = async ({ url, method, body, headers }: MutationProps) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
      return { success: true, data }; // ← Retorna el resultado
    } catch (err) {
      setError("Error al enviar solicitud");
      return { success: false, error: "Error al enviar solicitud" }; // ← Retorna el error
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
}

export default useMutation;
