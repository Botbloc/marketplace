"use client";
import React, { useState, useEffect } from "react";

const PriceRangeSlider = ({ min = 0, max = 2000, step = 10, funcMin, funcMax }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(1170);

  const getPercent = (v) => ((v - min) / (max - min)) * 100;

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  const handleMin = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(val);
  };

  const handleMax = (e) => {
    const val = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(val);
  };

  useEffect(()=>{
    funcMin(minVal);
  },[minVal])

  useEffect(()=>{
    funcMax(maxVal);
  },[maxVal])

  return (
    <div className="price-range">
      <div className="price-range__values">
        <span>£{minVal}</span>
        <span>£{maxVal}</span>
      </div>

      <div className="price-range__slider">
        {/* background track */}
        <div className="price-range__track" />

        {/* colored selected range */}
        <div
          className="price-range__range"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* MIN thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMin}
          className="price-range__input price-range__input--min"
        />

        {/* MAX thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMax}
          className="price-range__input price-range__input--max"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
