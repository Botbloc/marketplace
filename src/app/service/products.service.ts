import { Products_type } from "../types/Index";
import { fetchWithAuth } from "../../lib/api";

export const fetchUsers = async (): Promise<Products_type[]> => {
  return fetchWithAuth<Products_type[]>("/api/product");
};