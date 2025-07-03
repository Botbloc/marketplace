import React from "react";


export default function ProductCard({ item }) {
  return (
    <div className="rounded shadow-md bg-white p-4">
      {item.badge && <div className="bg-pink-500 text-white text-sm px-2 py-1 rounded">{item.badge}</div>}
      <img src={item.image} alt={item.title} className="w-full h-40 object-cover mt-2 rounded" />
      <p className="text-xs text-blue-700 font-semibold mt-2">{item.tagline}</p>
      <h4 className="font-bold text-lg">{item.title}</h4>
      <p className="text-sm text-gray-500">{item.description}</p>
      <p className="text-black font-bold mt-1">£{item.price}</p>
      <p className="text-xs text-gray-400 line-through">£{item.originalPrice}</p>
      <div className="text-yellow-400">⭐️⭐️⭐️⭐️☆</div>
    </div>
  );
}