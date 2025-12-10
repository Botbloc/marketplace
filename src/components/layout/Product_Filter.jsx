"use client";
// components/Sidebar.tsx
import Link from 'next/link';
import {useMemo} from "react";
import PriceRangeSlider from "../elements/PriceRangeSlider.jsx";
import Accordion from '../elements/Accordion.jsx';
import RadioButtonList from "../elements/RadioButtonList.jsx";

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


export default function Product_Filter({value, onChange}) {

  const setMinPrice = (v) =>
    onChange({ minPrice: v ? Number(v) : undefined });
  const setMaxPrice = (v) =>
    onChange({ maxPrice: v ? Number(v) : undefined });

  const setPrice= (min,max)=>
    onChange({
      minPrice: min ? Number(min) : undefined, 
      maxPrice: max ? Number(max) : undefined
    })

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
  
  const minPrice = 0;
  const maxPrice = 1000;

  return (
    <aside className="Product_filter">
      
      <nav>
        
        <Accordion title="Price Range" defaultOpen={false}>
          <PriceRangeSlider 
            min={0}
            max={2000}
            step={10}
            funcMin={(e) => setMinPrice(e)}
            funcMax={(e) => setMaxPrice(e)}
            />
        </Accordion>
        


        {/* Availability */}
        
        <Accordion title="Availability" defaultOpen={false}>
          <RadioButtonList
            value={value.availability ?? ""}
            onChange={setAvailability}
            options={AVAILABILITY_OPTIONS}
            className="w-fit bg-white text-black"
            name="availability"
          />
        </Accordion>
        


        {/* Condition */}
        <Accordion title="Condition" defaultOpen={false}>
          <RadioButtonList
            value={value.condition ?? ""}
            onChange={setCondition}
            options={CONDITION_OPTIONS}
            className="w-fit bg-white text-black"
            name="availability"
          />
        </Accordion>

        {/* Rating (stars) */}
        <Accordion title="Rating" defaultOpen={false}>
          
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
        </Accordion>


        <Accordion title="Shipping Location" defaultOpen={false}>
          <RadioButtonList
            value={value.shipping ?? ""}
            onChange={setShipping}
            options={SHIPPING_OPTIONS}
            className="w-fit bg-white text-black"
            name="Shipping Location"
          />
        </Accordion>
      </nav>
    </aside>
  );
}
