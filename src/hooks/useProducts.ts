import { useCallback, useEffect, useState } from "react";
import { getProducts } from "@/api/productApi";
import type { Product } from "@/types";

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Unable to load products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { products, isLoading, error, retry };
}
