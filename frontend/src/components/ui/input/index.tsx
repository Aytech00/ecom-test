"use client";
import React, { InputHTMLAttributes, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isPassword?: boolean;
  innerRef?: any;
};

const Input: React.FC<InputProps> = ({
  className,
  label,
  isPassword,
  type,
  innerRef,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (value: string) => {
    if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
    } else {
      setError(null);
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isPassword) {
      validatePassword(value);
    }
    props.onBlur && props.onBlur(event);
  };

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`px-4 py-2 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 ${
            isPassword ? "pr-10" : ""
          } ${className}`}
          type={isPassword && !showPassword ? "password" : type}
          onBlur={handleInputBlur}
          {...props}
          ref={innerRef}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
