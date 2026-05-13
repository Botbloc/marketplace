import { fetchWithTokenAuth } from "../lib/api";
import { Products_type } from "../types/Index";

export const fetchProducts = async (): Promise<Products_type[]> => {
  return fetchWithTokenAuth<Products_type[]>("/api/products");
};
