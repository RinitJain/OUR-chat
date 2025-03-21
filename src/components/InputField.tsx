import React, { ChangeEvent, KeyboardEvent } from "react";

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void; // ✅ Add onKeyDown prop
}

const InputField: React.FC<InputFieldProps> = ({ type, value, onChange, placeholder, onKeyDown }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown} // ✅ Now handles keydown events
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default InputField;
