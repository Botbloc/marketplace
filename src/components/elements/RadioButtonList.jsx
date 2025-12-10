// AvailabilityRadioGroup.jsx
"use client";
import React from "react";

export default function RadioButtonList({
  value,
  onChange,
  options,
  name ,
  className = "",
}) {
  return (
    <fieldset className={`radio-group ${className}`}>
      {options.map(opt => (
        <label key={opt.value ?? ""} className="radio-row">
          <input
            type="radio"
            name={name}
            value={opt.value ?? ""}
            checked={(value ?? "") === (opt.value ?? "")}
            onChange={() => onChange(opt.value ?? "")}
          />
          <span className="custom-radio"></span>
          <span className="radio-label">{opt.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
