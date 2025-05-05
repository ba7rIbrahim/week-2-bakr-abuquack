import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = "left",
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: "bg-primary text-white hover:bg-gray-800 focus:ring-primary",
      secondary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      danger: "bg-danger text-white hover:bg-red-700 focus:ring-red-500",
      outline:
        "bg-transparent border border-gray-300 hover:bg-gray-50 focus:ring-gray-300",
      ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-200 px-0 py-0",
    };

    const sizeClasses = {
      sm: "py-1 px-3 text-sm",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-xl",
    };

    const buttonClasses = `
      rounded-md
      font-medium
      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      transition-colors
      duration-200
      flex items-center justify-center
      gap-2
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${disabled || loading ? "opacity-70 cursor-not-allowed" : ""}
      ${className}
    `;

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {icon && iconPosition === "left" && !loading && icon}
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
        {icon && iconPosition === "right" && !loading && icon}
      </button>
    );
  }
);
