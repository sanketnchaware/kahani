import React from "react";

const CommonButton = ({
  type = "button", // Default button type
  styles = "text-xs", // Custom styles
  size = "sm", // Button size ("sm", "md", "lg", "xl")
  variant = "primary", // Variant ("primary", "secondary", "contained")
  onClick, // Click handler
  children, // Button content
  disabled = false, // Disabled state
  loading = false, // Loading state
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
      type={type}
      onClick={onClick}
      disabled={disabled || loading} // Disable when loading
      className={`${styles} common_button flex-shrink-0 ${
        sizeStyles[size] || "py-2"
      } ${variantStyles[variant] || "bg-black"} ${
        disabled || loading
          ? "bg-gray-400 cursor-not-allowed"
          : "transition-all"
      } rounded-md flex items-center justify-center gap-2`}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default CommonButton;
