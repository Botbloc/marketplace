"use client";
// components/Sidebar.tsx
import Link from 'next/link';
import {useMemo} from "react";

const AVAILABILITY_OPTIONS = [
  { label: "Any", value: undefined },
  { label: "In Stock", value: "in_stock" },
  { label: "Pre-order", value: "preorder" },
  { label: "Out of Stock", value: "out_of_stock" },
];

const CONDITION_OPTIONS = [
  { label: "Any", value: undefined },
  { label: "New", value: "new" },
  { label: "Refurbished", value: "refurbished" },
  { label: "Used — Like New", value: "used_like_new" },
  { label: "Used — Good", value: "used_good" },
];

const SHIPPING_OPTIONS = [
  { label: "Any", value: undefined },
  { label: "Domestic", value: "domestic" },
  { label: "International", value: "international" },
  { label: "UK Only", value: "uk" },
  { label: "EU", value: "eu" },
  { label: "US", value: "us" },
];


export default function Sidebar({value, onChange}) {

  const setMinPrice = (v) =>
    onChange({ minPrice: v ? Number(v) : undefined });
  const setMaxPrice = (v) =>
    onChange({ maxPrice: v ? Number(v) : undefined });

  const setAvailability = (v) =>
    onChange({ availability: v || undefined });

  const setCondition = (v) =>
    onChange({ condition: v || undefined });

  const setShipping = (v) =>
    onChange({ shipping: v || undefined });

  // Star rating: click to set minRating (1..5); click again to clear
  const setStars = (n) => {
    const next = value.minRating === n ? undefined : n;
    onChange({ minRating: next });
  };

  return (
    <aside className="sidebar">
      
      <nav>
        <div>
        <h5>Price Range</h5>
        <div>
          <input
            type="number"
            placeholder="Min"
            value={value.minPrice ?? ""}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />

          <input
            type="number"
            placeholder="Max"
            value={value.maxPrice ?? ""}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        </div>


        {/* Availability */}
      <div>
        <div className="text-lg font-semibold mb-2">Availability</div>
        <select
          value={value.availability ?? ""}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-fit rounded-md px-3 py-2"
          style={{ background: "white", color: "black" }}
        >
          {AVAILABILITY_OPTIONS.map(opt => (
            <option key={opt.label} value={opt.value ?? ""}>{opt.label}</option>
          ))}
        </select>
      </div>



      {/* Condition */}
      <div>
        <div className="text-lg font-semibold mb-2">Condition</div>
        <select
          value={value.condition ?? ""}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full rounded-md px-3 py-2"
          style={{ background: "white", color: "black" }}
        >
          {CONDITION_OPTIONS.map(opt => (
            <option key={opt.label} value={opt.value ?? ""}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Rating (stars) */}
      <div>
        <div className="text-lg font-semibold mb-2">Rating</div>
        <div className="flex items-center gap-1" role="group" aria-label="Minimum rating">
          {[1,2,3,4,5].map(n => {
            const active = (value.minRating ?? 0) >= n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setStars(n)}
                aria-label={`${n} star${n>1?"s":""} & up`}
                className="text-2xl leading-none"
                style={{
                  background: "transparent",
                  color: active ? "gold" : "black",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 2px",
                  fontSize: "30px"
                }}
              >
                {active ? "★" : "☆"}
              </button>
            );
          })}
          {/* Clear button (optional) */}
          {value.minRating ? (
            <button
              type="button"
              onClick={() => onChange({ minRating: undefined })}
              className="ml-3 text-sm underline "
              style={{ color: "white" }}
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>


        <div>
        <div className="text-lg font-semibold mb-2">Shipping Location</div>
        <select
          value={value.shipping ?? ""}
          onChange={(e) => setShipping(e.target.value)}
          className="w-full rounded-md px-3 py-2"
          style={{ background: "white", color: "black" }}
        >
          {SHIPPING_OPTIONS.map(opt => (
            <option key={opt.label} value={opt.value ?? ""}>{opt.label}</option>
          ))}
        </select>
      </div>
      </nav>
    </aside>
  );
}
