"use client";
import React from "react";
import {createContext, useState, useEffect,useMemo} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;

// context storing the cart details that can be used later on
const ProductContext = createContext();

// categories: R-cores, Actuators, End effectors, Sensors, applications, accessories
// stock: number
// condition: new, second-hand
// rating: 1 to 5 stars
// shipping: uk, hk
const items = [
  // R-cores (3)
  {
    id: "1",
    product_name: "R-Core 100W Transformer",
    price: 120,
    currency: "$",
    category: "R-cores",
    stock: 24,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
  },
  {
    id: "2",
    product_name: "R-Core 50W Compact",
    price: 85,
    currency: "$",
    category: "R-cores",
    stock: 0,
    condition: "second-hand",
    rating: 3,
    shipping: ["uk"],
  },
  {
    id: "3",
    product_name: "R-Core 200W High Efficiency",
    price: 210,
    currency: "$",
    category: "R-cores",
    stock: 11,
    condition: "new",
    rating: 4,
    shipping: ["hk"],
  },

  // Actuators (4)
  {
    id: "4",
    product_name: "Linear Actuator 150mm Stroke",
    price: 180,
    currency: "$",
    category: "Actuators",
    stock: 19,
    condition: "new",
    rating: 4,
    shipping: ["uk", "hk"],
  },
  {
    id: "5",
    product_name: "Servo Actuator Pro 20kg·cm",
    price: 75,
    currency: "$",
    category: "Actuators",
    stock: 33,
    condition: "new",
    rating: 5,
    shipping: ["uk"],
  },
  {
    id: "6",
    product_name: "Pneumatic Actuator Compact",
    price: 140,
    currency: "$",
    category: "Actuators",
    stock: 5,
    condition: "second-hand",
    rating: 3,
    shipping: ["hk"],
  },
  {
    id: "7",
    product_name: "BLDC Actuator Module",
    price: 220,
    currency: "$",
    category: "Actuators",
    stock: 14,
    condition: "new",
    rating: 4,
    shipping: ["uk", "hk"],
  },

  // End effectors (4)
  {
    id: "8",
    product_name: "Two-Finger Parallel Gripper",
    price: 260,
    currency: "$",
    category: "End effectors",
    stock: 8,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
  },
  {
    id: "9",
    product_name: "Vacuum Suction Cup Kit",
    price: 95,
    currency: "$",
    category: "End effectors",
    stock: 27,
    condition: "new",
    rating: 4,
    shipping: ["uk"],
  },
  {
    id: "10",
    product_name: "Magnetic Gripper Heavy-Duty",
    price: 180,
    currency: "$",
    category: "End effectors",
    stock: 0,
    condition: "second-hand",
    rating: 2,
    shipping: ["hk"],
  },
  {
    id: "11",
    product_name: "Soft Gripper Food-Grade",
    price: 310,
    currency: "$",
    category: "End effectors",
    stock: 12,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
  },

  // Sensors (4)
  {
    id: "12",
    product_name: "Lidar Distance Sensor 12m",
    price: 150,
    currency: "$",
    category: "Sensors",
    stock: 22,
    condition: "new",
    rating: 4,
    shipping: ["uk"],
  },
  {
    id: "13",
    product_name: "Industrial IMU 9-Axis",
    price: 130,
    currency: "$",
    category: "Sensors",
    stock: 16,
    condition: "second-hand",
    rating: 3,
    shipping: ["hk"],
  },
  {
    id: "14",
    product_name: "Force/Torque Sensor 6-Axis",
    price: 480,
    currency: "$",
    category: "Sensors",
    stock: 7,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
  },
  {
    id: "15",
    product_name: "Optical Encoder 1024 PPR",
    price: 60,
    currency: "$",
    category: "Sensors",
    stock: 29,
    condition: "new",
    rating: 4,
    shipping: ["uk"],
  },

  // applications (3)
  {
    id: "16",
    product_name: "Quality Inspection Kit (Vision)",
    price: 890,
    currency: "$",
    category: "applications",
    stock: 4,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
  },
  {
    id: "17",
    product_name: "Assembly Line Starter Pack",
    price: 1250,
    currency: "$",
    category: "applications",
    stock: 3,
    condition: "second-hand",
    rating: 4,
    shipping: ["hk"],
  },
  {
    id: "18",
    product_name: "Material Transport Bundle",
    price: 990,
    currency: "$",
    category: "applications",
    stock: 6,
    condition: "new",
    rating: 4,
    shipping: ["uk"],
  },

  // accessories (2)
  {
    id: "19",
    product_name: "Cable Management Kit",
    price: 35,
    currency: "$",
    category: "accessories",
    stock: 42,
    condition: "new",
    rating: 4,
    shipping: ["uk", "hk"],
  },
  {
    id: "20",
    product_name: "Mounting Bracket Universal",
    price: 28,
    currency: "$",
    category: "accessories",
    stock: 18,
    condition: "second-hand",
    rating: 3,
    shipping: ["uk"],
  },
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
          category: p.category ?? "",
          stock: typeof p.stock === "number" ? p.stock : 10,
          //preorder: Boolean(p.preorder) || false,
          condition: p.condition ?? "new",
          rating: typeof p.rating === "number" ? p.rating : 4,
          shipping: Array.isArray(p.shipping) ? p.shipping : ["uk","international"],
          //createdAt: p.createdAt ?? new Date(Date.now() - idx * 86400000).toISOString(),
          //thumbnail: p.thumbnail ?? placeholder.src,
        }))
    ), [products]);
    

    return (
        <ProductContext.Provider value={{allProducts, products,idIndex, findProductByID, addProduct}}>
            {children} 
        </ProductContext.Provider>
    );
}




export default ProductContext;