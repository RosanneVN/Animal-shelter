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

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    console.log("res",response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    setData(data);
    return { success: true, data };
  };

  return { mutate, data, loading, error };
}

export default useMutation;
