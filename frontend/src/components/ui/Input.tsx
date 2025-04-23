import { Eye, EyeOff } from "lucide-react";
import React, { forwardRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", containerClassName = "", ...props }, ref) => {
    return (
      <div className={`mb-4 text-border font-semibold  ${containerClassName}`}>
        <input
          ref={ref}
          className={`w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", containerClassName = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div
        className={`flex items-center justify-between mb-4 text-border font-semibold  ${containerClassName}`}
      >
        <input
          type={showPassword ? "text" : "password"}
          ref={ref}
          className={`w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none ${className}`}
          {...props}
        />
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="text-gray-500 hover:text-gray-700" />
          ) : (
            <Eye className="text-gray-500 hover:text-gray-700" />
          )}
        </button>
      </div>
    );
  }
);

Input.displayName = "Input";
