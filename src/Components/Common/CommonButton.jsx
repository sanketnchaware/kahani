import React from "react";

const CommonButton = ({
  type = "button", // Default button type
  styles = "text-xs", // Custom styles
  size = "sm", // Button size ("sm", "md", "lg", "xl")
  variant = "primary", // Variant ("primary", "secondary", "contained")
  onClick, // Click handler
  children, // Button content
  disabled = false, // Disabled state
  ...props // Additional props
}) => {
  // Determine styles based on variant
  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-slate-300 text-black hover:bg-slate-400",
    contained: "bg-slate-300 text-black hover:bg-slate-400",
  };

  // Size-specific padding
  const sizeStyles = {
    sm: "py-2 px-2 ",
    md: "py-3 px-4 ",
    lg: "py-4 px-6 ",
    xl: "py-5 px-8 ",
  };

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`${styles} common_button flex-shrink-0 ${
        sizeStyles[size] || "py-2"
      } ${variantStyles[variant] || "bg-black"} ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "transition-all"
      } rounded-md`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
