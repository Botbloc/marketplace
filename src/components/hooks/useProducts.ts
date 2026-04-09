"use client";

import { useEffect, useState,useCallback , useRef} from "react";

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
  nextCursor: string | null;
  count: number;
  hasMore: boolean;
  error?: string;
  details?: string;
};

export function useProducts(filters: Filters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);
  const cooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  //const [meta, setMeta] = useState<ProductsResponse | null>(null);

  const buildParams = (cursor?: string | null) => {
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
    if (filters.brand?.length) {
      filters.brand.forEach((b) => params.append("brand", b));
    }
    if (cursor) params.set("cursor", cursor);

    params.set("limit", "8");
    const returningParam = params.toString();
    console.log("returningParam: ", returningParam);
    return returningParam;
  }

  const fetchInitialProducts = useCallback(async () => {
    const controller = new AbortController();
    try {
        setInitialLoading(true);
        setError("");
        setProducts([]);
        setNextCursor(null);
        setHasMore(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/products?${buildParams()}`,
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
        setNextCursor(data.nextCursor ?? null);
        setHasMore(data.hasMore ?? false);
        
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError(err.message || "Could not load products");
        setNextCursor(null);
        setHasMore(false);
      } finally {
        setInitialLoading(false);
      }

      return () => controller.abort();
  },[filters])

  const loadMore = useCallback(async () => {
    //console.log("nextCursor: ",nextCursor);
    //console.log("hasMore: ",hasMore);
    //console.log("loadingMore: ",loadingMore);
    //console.log("!nextCursor || !hasMore: ",!nextCursor || !hasMore);
    //console.log("isFetchingRef.current: ",isFetchingRef.current);
    //console.log("cooldownRef.current: ",cooldownRef.current);
    if (!nextCursor || !hasMore) return;
    if (isFetchingRef.current) return;
    if (cooldownRef.current) return;

    try {
      isFetchingRef.current = true;
      setLoadingMore(true);
      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/products?${buildParams(nextCursor)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data: ProductsResponse = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch more products");
      }

      setProducts((prev) => [...prev, ...(data.products ?? [])]);
      setNextCursor(data.nextCursor ?? null);
      setHasMore(data.hasMore ?? false);

      cooldownRef.current = setTimeout(() => {
        cooldownRef.current = null;
      }, 500);
      isFetchingRef.current = false;

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not load more products");
      cooldownRef.current = setTimeout(() => {
        cooldownRef.current = null;
      }, 1500);
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, hasMore, loadingMore, filters]);

  useEffect(() => {
    fetchInitialProducts();
    return () => {
      if (cooldownRef.current) {
        clearTimeout(cooldownRef.current);
      }
    };
  }, [fetchInitialProducts]);


  return {
    products,
    error,
    initialLoading,
    loadingMore,
    hasMore,
    loadMore,
  };
}