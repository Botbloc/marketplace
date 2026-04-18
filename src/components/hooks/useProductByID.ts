"use client";

import { useEffect, useState, useRef } from "react";

type Product = {
  id: string;
  product_name?: string;
  price?: number;
  currency?: string;
  description?: string;
  status?: string;
  delivery_status?: string;
  rating?: number;
  review?: any;
  specs?: Record<string, string | number>;
};

export function useProductByID(productID: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isFetchingRef = useRef(false);
  
  useEffect(() => {
    console.log("product id: ", productID);
    if (!productID) {
        console.log("fuck");
        setProduct(null);
        setError("no product ID provided");
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchProduct = async () => {
      try {
        //isFetchingRef.current = true;
        setLoading(true);
        setError("");
        console.log();
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${(productID)}`, {
          method: "GET",
          signal: controller.signal,
          credentials: "include",
        });
        console.log("fetch response: ", res);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch product");
        }

        setProduct(data.product);
        setLoading(false);
        //isFetchingRef.current = false;
        
      } catch (err: any) {
        if (err.name === "AbortError") {
            console.log("Fetch aborted");
            return;
        }
        setError("Could not load product: " + err.message);
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
        //isFetchingRef.current = false;
      }
    };

    fetchProduct();

    return () => {
      controller.abort();
    };
  }, [productID]);

  return { product, loading, error };
}
