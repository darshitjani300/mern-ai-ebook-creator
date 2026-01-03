import React from "react";

interface IinputFieldProp {
  Icon?: any;
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  className?: any;
  disabled?: boolean;
}

const InputField: React.FC<IinputFieldProp> = ({
  Icon,
  label,
  name,
  type = "text",
  placeholder = "",
  required,
  value,
  onChange,
  min,
  max,
  className,
  disabled,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e)}
          className={`w-full h-11 px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
            Icon ? "pl-10" : ""
          } ${className}`}
          min={min}
          max={max}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default InputField;
