"use client";
import { useCallback, useEffect, useState } from "react";

type CartItem = {
    id: string | number;
    quantity: number | string;
    currency?: string;
    price?: number | string;
    product_name?: string;
};

type UseCartProps = {
    local_cart?: CartItem[];
};

export const useCart = ({local_cart = [] }: UseCartProps = {}) => {
    const [cloud_cart, setCloudCart] = useState<CartItem[]>([]);
    const [error, setError] = useState("");

    const fetchCart = useCallback(async () => {
        try {
            setError("");
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/getCart`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.error || "Failed to fetch cart");
            }

            setCloudCart(data.cart ?? []);
        } catch (err) {
            console.log("Error fetching cart: ", err);
            setError(err instanceof Error ? err.message : "Error fetching cart");
        }
    }, []);

    const mergeCart = useCallback( async (local_cart : CartItem[] ): Promise<CartItem[]> => {
        const existing = localStorage.getItem("pendingCartMerge");

        const pendingMerge = existing
            ? JSON.parse(existing)
            : {
                mergeRequestId: crypto.randomUUID(),
                items: local_cart,
                createdAt: new Date().toISOString(),
            };

        localStorage.setItem("pendingCartMerge", JSON.stringify(pendingMerge));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/mergeCart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                mergeRequestId: pendingMerge.mergeRequestId,
                items: pendingMerge.items,
            }),
            });

            if (!response.ok) {
            throw new Error("Cart merge failed");
            }

            const result = await response.json();
            console.log(result);

            localStorage.removeItem("pendingCartMerge");
            localStorage.removeItem("cart");

            return result.cart.items;
        } catch (error) {
            // Keep pendingCartMerge in localStorage.
            // Retry later with the same mergeRequestId.
            throw error;
        }
    },[]);


    const addCart = useCallback(
        async (productId: string, quantity: number): Promise<CartItem[] | null> => {
            try {
                
                setError("");
                 if (!productId) {
                    throw new Error("Product ID is required");
                }

                if (quantity <= 0) {
                    throw new Error("Quantity must be greater than 0");
                }
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/addCart`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        id : productId, 
                        quantity : quantity 
                    }),
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok) {
                    throw new Error(data?.error || "Failed to update cart");
                }

                return data?.cart?.items || [];
            } catch (err) {
                console.log("Error updating cart: ", err);
                setError(err instanceof Error ? err.message : "Error updating cart");
                return null;
            }
        },
        []
    );

    const removeCartItems = useCallback(
        async (productIds: string | string[]): Promise<CartItem[] | null> => {
            try {
            setError("");

            const ids = Array.isArray(productIds) ? productIds : [productIds];

            if (ids.length === 0) {
                throw new Error("At least one product ID is required");
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/removeCart`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: ids }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.error || "Failed to remove cart item(s)");
            }

            return data?.cart?.items || [];
            } catch (err) {
            console.log("Error removing cart item(s):", err);
            setError(err instanceof Error ? err.message : "Error removing cart item(s)");
            return null;
            }
        },
        []
    );



    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return { cloud_cart , mergeCart, addCart, removeCartItems, error };
}
