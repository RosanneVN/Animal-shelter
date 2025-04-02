import { useEffect, useState } from "react";
import type { Pets } from "../interfaces";

type Props = {
  url: string;
};
function useFetch({ url }: Props) {
  const [data, setData] = useState<Pets[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [controller, setController] = useState<AbortController | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request canceled");
        }
        setError(error);
      })

      .finally(() => setLoading(false));

    return () => {
      abortController.abort();
    };
  }, []);
  return { data, loading, error };
}
export default useFetch;
