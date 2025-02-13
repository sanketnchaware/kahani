import React from "react";

const SelectDropdown = ({
  value,
  onChange,
  showvalue,
  name,
  options,
  placeholder = "Select an option",
  className = "",
  error = "",
}) => {
  return (
    <div className="relative w-full">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-transparent border text-black w-full py-3 border-slate-600 ${
          error ? "border-red-500" : ""
        } ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option[showvalue]} value={option[showvalue]}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectDropdown;
