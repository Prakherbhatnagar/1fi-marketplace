import { useCallback, useEffect, useState } from "react";
import { getProductById } from "@/api/productApi";
import type { Product } from "@/types";

interface UseProductResult {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
  retry: () => void;
}

export function useProduct(id: number | null): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(async () => {
    if (id === null) return;
    setIsLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const data = await getProductById(id);
      if (data === null) {
        setNotFound(true);
      } else {
        setProduct(data);
      }
    } catch {
      setError("Unable to load this product");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { product, isLoading, error, notFound, retry };
}
