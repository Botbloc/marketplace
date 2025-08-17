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
  {
    id: "AB-1234",
    product_name: "R25 4Ah Lithium-ion Battery",
    price: 120,
    currency: "$",
    category: "R-cores",
    stock: 24,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
    description : "Official robot battery for high performance",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
    specs: 
      {
        input: "3.3V 3-5A",
        Dimensions : "Length 420mm x Width 300mm x Height 48mm"
      }
    
  },
  {
    id: "AB-1000",
    product_name: "R-Core 50W Compact",
    price: 85,
    currency: "$",
    category: "R-cores",
    stock: 0,
    condition: "second-hand",
    rating: 3,
    shipping: ["uk"],
    description : "Compact 50W transformer, refurbished condition.",
    status: "Out of stock",
    delivery_status: "Ships when restocked",
  },
  {
    id: "AB-1001",
    product_name: "R-Core 200W High Efficiency",
    price: 210,
    currency: "$",
    category: "R-cores",
    stock: 11,
    condition: "new",
    rating: 4,
    shipping: ["hk"],
    description : "200W high-efficiency R-Core for industrial use.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },

  // Actuators
  {
    id: "AB-1002",
    product_name: "Linear Actuator 150mm Stroke",
    price: 180,
    currency: "$",
    category: "Actuators",
    stock: 19,
    condition: "new",
    rating: 4,
    shipping: ["uk", "hk"],
    description : "Precision linear actuator with 150mm stroke length.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1003",
    product_name: "Servo Actuator Pro 20kg·cm",
    price: 75,
    currency: "$",
    category: "Actuators",
    stock: 33,
    condition: "new",
    rating: 5,
    shipping: ["uk"],
    description : "High-torque servo actuator, 20kg·cm load capacity.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1004",
    product_name: "Pneumatic Actuator Compact",
    price: 140,
    currency: "$",
    category: "Actuators",
    stock: 5,
    condition: "second-hand",
    rating: 3,
    shipping: ["hk"],
    description : "Compact pneumatic actuator, lightly used.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1005",
    product_name: "BLDC Actuator Module",
    price: 220,
    currency: "$",
    category: "Actuators",
    stock: 14,
    condition: "new",
    rating: 4,
    shipping: ["uk", "hk"],
    description : "Brushless DC actuator module for robotics projects.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },

  // End effectors
  {
    id: "AB-1006",
    product_name: "Two-Finger Parallel Gripper",
    price: 260,
    currency: "$",
    category: "End effectors",
    stock: 8,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
    description : "Durable two-finger gripper for industrial robots.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1007",
    product_name: "Vacuum Suction Cup Kit",
    price: 95,
    currency: "$",
    category: "End effectors",
    stock: 27,
    condition: "new",
    rating: 4,
    shipping: ["uk"],
    description : "Suction cup kit for material handling applications.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1008",
    product_name: "Magnetic Gripper Heavy-Duty",
    price: 180,
    currency: "$",
    category: "End effectors",
    stock: 0,
    condition: "second-hand",
    rating: 2,
    shipping: ["hk"],
    description : "Heavy-duty magnetic gripper, second-hand condition.",
    status: "Out of stock",
    delivery_status: "Ships when restocked",
  },
  {
    id: "AB-1009",
    product_name: "Soft Gripper Food-Grade",
    price: 310,
    currency: "$",
    category: "End effectors",
    stock: 12,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
    description : "Food-grade compliant soft gripper for delicate items.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },

  // Sensors
  {
    id: "AB-1010",
    product_name: "Lidar Distance Sensor 12m",
    price: 150,
    currency: "$",
    category: "Sensors",
    stock: 22,
    condition: "new",
    rating: 4,
    shipping: ["uk"],
    description : "Lidar sensor with 12m range for mapping and safety.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1011",
    product_name: "Industrial IMU 9-Axis",
    price: 130,
    currency: "$",
    category: "Sensors",
    stock: 16,
    condition: "second-hand",
    rating: 3,
    shipping: ["hk"],
    description : "9-axis industrial IMU for motion tracking, refurbished.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1012",
    product_name: "Force/Torque Sensor 6-Axis",
    price: 480,
    currency: "$",
    category: "Sensors",
    stock: 7,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
    description : "6-axis force/torque sensor for precision applications.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1013",
    product_name: "Optical Encoder 1024 PPR",
    price: 60,
    currency: "$",
    category: "Sensors",
    stock: 29,
    condition: "new",
    rating: 4,
    shipping: ["uk"],
    description : "Optical encoder with 1024 pulses per revolution.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },

  // Applications
  {
    id: "AB-1014",
    product_name: "Quality Inspection Kit (Vision)",
    price: 890,
    currency: "$",
    category: "applications",
    stock: 4,
    condition: "new",
    rating: 5,
    shipping: ["uk", "hk"],
    description : "Vision system starter kit for automated inspection.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1015",
    product_name: "Assembly Line Starter Pack",
    price: 1250,
    currency: "$",
    category: "applications",
    stock: 3,
    condition: "second-hand",
    rating: 4,
    shipping: ["hk"],
    description : "Refurbished assembly line starter kit with core tools.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1016",
    product_name: "Material Transport Bundle",
    price: 990,
    currency: "$",
    category: "applications",
    stock: 6,
    condition: "new",
    rating: 4,
    shipping: ["uk"],
    description : "Bundle for automated material transport solutions.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },

  // Accessories
  {
    id: "AB-1017",
    product_name: "Cable Management Kit",
    price: 35,
    currency: "$",
    category: "accessories",
    stock: 42,
    condition: "new",
    rating: 4,
    shipping: ["uk", "hk"],
    description : "Organize and protect cables with this management kit.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
  },
  {
    id: "AB-1018",
    product_name: "Mounting Bracket Universal",
    price: 28,
    currency: "$",
    category: "accessories",
    stock: 18,
    condition: "second-hand",
    rating: 3,
    shipping: ["uk"],
    description : "Universal mounting bracket, refurbished quality.",
    status: "In stock",
    delivery_status: "Delivery in 2 days",
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
            data: item
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