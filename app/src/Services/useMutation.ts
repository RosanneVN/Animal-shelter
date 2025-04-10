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

  const mutate = ({ url, method, body, headers }: MutationProps) => {
    setLoading(true);
    setError(null);

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { mutate, data, loading, error };
}

export default useMutation;
