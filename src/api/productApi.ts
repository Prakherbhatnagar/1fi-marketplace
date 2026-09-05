import { PRODUCTS, findProductById } from "@/data/products";
import type { Product } from "@/types";

const NETWORK_DELAY_MS = 650;

function delay<T>(value: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function getSimulationFlag(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("simulate");
}

export async function getProducts(): Promise<Product[]> {
  const simulate = getSimulationFlag();

  if (simulate === "error") {
    await delay(null);
    throw new Error("Network request failed");
  }
  if (simulate === "empty") {
    return delay([]);
  }
  return delay([...PRODUCTS]);
}

export async function getProductById(id: number): Promise<Product | null> {
  const product = findProductById(id);
  return delay(product ?? null);
}
