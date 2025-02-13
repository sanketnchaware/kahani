import React from "react";

const TextInput = ({
  value,
  onChange,
  name,
  placeholder,
  type = "text",
  className = "",
  error = "", // Accept an error message prop
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600 ${
          error ? "border-red-500" : "" // Apply red border if there's an error
        } ${className}`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
};

export default TextInput;
