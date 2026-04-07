"use client";

import { useEffect, useState } from "react";

type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  availability?: string;
  condition?: string;
  minRating?: number;
  shipping?: string;
  brand?: string[];
  sort?: string;
  page?: number;
};

type Product = {
  id: string;
  product_name?: string;
  name?: string;
  img?: string;
  price: number;
  currency: string;
  category?: string;
  stock?: number;
  preorder?: boolean;
  condition?: string;
  rating?: number;
  shipping?: string[];
  createdAt?: string;
};

type ProductsResponse = {
  products: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  error?: string;
};

export function useProducts(filters: Filters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<ProductsResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (filters.category) params.set("category", filters.category);
        if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
        if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
        if (filters.inStock !== undefined) params.set("inStock", String(filters.inStock));
        if (filters.availability) params.set("availability", filters.availability);
        if (filters.condition) params.set("condition", filters.condition);
        if (filters.minRating !== undefined) params.set("minRating", String(filters.minRating));
        if (filters.shipping) params.set("shipping", filters.shipping);
        if (filters.sort) params.set("sort", filters.sort);
        if (filters.page) params.set("page", String(filters.page));
        if (filters.brand?.length) {
          filters.brand.forEach((b) => params.append("brand", b));
        }
        

        params.set("limit", "24");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/products?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
            signal: controller.signal,
          }
        );
        const data: ProductsResponse = await res.json();

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${data?.error ?? ""}`);
        }

        

        setProducts(data.products ?? []);
        setMeta(data);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError("Could not load products");
        setProducts([]);
        setMeta(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [filters]);

  return { products, loading, error, meta };
}