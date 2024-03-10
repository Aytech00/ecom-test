"use client";
import { useEffect, useRef, useState } from "react";

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
};

type SelectProps = {
  options: Option[];
  value: string;
  label?: string;
  onChange: (value: string) => void;
};

const Select = ({ options, value, label, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {options.find((option) => option.value === value)?.label ??
            "Select an option"}
          <svg
            className="w-5 h-5 ml-2 -mr-1 mb-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md max-h-[200px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`block w-full px-4 py-2 text-left hover:bg-gray-50 ${
                  option.hidden
                    ? "hidden"
                    : option.value === value
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
                disabled={option.disabled}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
