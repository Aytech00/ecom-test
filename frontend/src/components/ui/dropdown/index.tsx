import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
};

const DropdownMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const options: Option[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {selectedOption?.label || "Select an option"}
        </button>
        {isMenuOpen && (
          <ul>
            {options.map((option) => (
              <li key={option.value} onClick={() => handleOptionSelect(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
