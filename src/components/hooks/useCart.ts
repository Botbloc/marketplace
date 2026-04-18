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

    async function mergeGuestCartAfterLogin(local_cart): Promise<CartItem[]> {
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
            const response = await fetch("/api/user/mergeCart", {
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

            localStorage.removeItem("pendingCartMerge");
            localStorage.removeItem("guestCart");

            return result.cart;
        } catch (error) {
            // Keep pendingCartMerge in localStorage.
            // Retry later with the same mergeRequestId.
            throw error;
        }
    }


    const setCart = useCallback(
        async (nextCart: CartItem[] = local_cart) => {
            try {
                
                setError("");
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/setCart`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cart: nextCart }),
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok) {
                    throw new Error(data?.error || "Failed to update cart");
                }

                setCloudCart(data.cart ?? nextCart);
                return data.cart ?? nextCart;
            } catch (err) {
                console.log("Error updating cart: ", err);
                setError(err instanceof Error ? err.message : "Error updating cart");
                return null;
            }
        },
        [local_cart]
    );

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return { cloud_cart, setCart, error };
}
