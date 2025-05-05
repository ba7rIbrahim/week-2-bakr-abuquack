import { ErrorMessage } from "@components/shared/error-message";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  error?: string;
}

export const Input = ({
  className = "",
  containerClassName = "",
  error,
  ...props
}: InputProps) => {
  return (
    <div className={`mb-4 text-primary font-semibold  ${containerClassName}`}>
      <div className="flex items-center justify-between">
        <input
          className={`w-full py-2 px-1 border-b border-border focus:border-primary focus:outline-none  ${className}`}
          {...props}
        />
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export const PasswordInput = ({
  className = "",
  containerClassName = "",
  error,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`mb-4 text-primary font-semibold  ${containerClassName}`}>
      <div className="flex items-center justify-between">
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full py-2 px-1 border-b border-border focus:border-primary focus:outline-none ${className}`}
          {...props}
        />
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="text-border hover:text-gray-700" />
          ) : (
            <Eye className="text-border hover:text-gray-700" />
          )}
        </button>
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

