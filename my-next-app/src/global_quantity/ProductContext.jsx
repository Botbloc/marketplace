"use client";
import React from "react";
import {createContext, useState, useEffect,useMemo} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;

// context storing the cart details that can be used later on
const ProductContext = createContext();

const items =[
  { id: '1', product_name: 'Apple', price: 200, currency:"$" },
  { id: '2', product_name: 'Banana', price: 100 , currency:"$"},
  { id: '3', product_name: 'Cherry', price: 200 , currency:"$" },
  { id: '4', product_name: 'Component 1', price: 1200 , currency:"$" },
  { id: '5', product_name: 'component 2', price: 3000 , currency:"$" }
];

export const ProductProvider = ({children}) => {
    
    const [products, setProducts] = useState(items);

    // NEW: derive a Map index for O(1) lookups by id (internal)
    const idIndex = useMemo(() => new Map(products.map(p => [p.id, p])), [products]);


       
    
    // UPDATED: use the index; return same shape as before
    const findProductByID = (id) => {
        const item = idIndex.get(id);
        if (item) {
        return {
            exist: true,
            product_name: item.product_name,
            price: item.price,
            currency: item.currency ?? "$",
        };
        }
        return { exist: false };
    };

    // UPDATED: immutably add/update in ARRAY
  const addProduct = (id, product_name, price) => {
    const nextItem = { id, product_name, price, currency: "$" };
    setProducts(prev => {
      const i = prev.findIndex(p => p.id === id);
      if (i !== -1) {
        const copy = [...prev];
        copy[i] = { ...copy[i], ...nextItem };
        return copy;
      }
      return [...prev, nextItem];
    });
  };

    // NEW: normalized array your page/filter expects
     const allProducts = useMemo(() => (
        products.map((p, idx) => ({
        id: p.id,
        name: p.product_name,                // alias for UI
        product_name: p.product_name,
        price: Number(p.price) || 0,
        currency: p.currency ?? "$",
        // safe defaults for filters
        brand: p.brand ?? "Generic",
        category: p.category ?? "",
        stock: typeof p.stock === "number" ? p.stock : 10,
        preorder: Boolean(p.preorder) || false,
        condition: p.condition ?? "new",
        rating: typeof p.rating === "number" ? p.rating : 4,
        shipping: Array.isArray(p.shipping) ? p.shipping : ["uk","international"],
        createdAt: p.createdAt ?? new Date(Date.now() - idx * 86400000).toISOString(),
        thumbnail: p.thumbnail ?? placeholder.src,
        }))
    ), [products]);
    

    return (
        <ProductContext.Provider value={{allProducts, products,idIndex, findProductByID, addProduct}}>
            {children} 
        </ProductContext.Provider>
    );
}




export default ProductContext;