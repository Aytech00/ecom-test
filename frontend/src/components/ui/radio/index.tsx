import { useState } from "react";

type RadioOption = {
  label: string;
  value: string;
};

type RadioProps = {
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  defaultChecked?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Radio: React.FC<RadioProps> = ({
  options,
  name,
  value,
  onChange,
  defaultChecked,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultChecked || value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md w-full"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleInputChange}
            className="form-radio h-4 w-4 accent-[#000]"
            {...props}
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default Radio;
