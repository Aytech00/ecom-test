import { TagsInput as ReactTagsInput } from "react-tag-input-component";

type Props = {
  label?: string;
  value?: string[];
  onChange?: any;
  placeholder?: string;
};

const TagsInput = ({ label, value, onChange, placeholder }: Props) => {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <ReactTagsInput
        value={value}
        onChange={onChange}
        placeHolder={placeholder}
      />
    </div>
  );
};

export default TagsInput;
