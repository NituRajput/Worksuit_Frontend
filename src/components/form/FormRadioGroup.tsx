import React from 'react';
import { Info } from 'lucide-react';
interface RadioOption {
  value: string;
  label: string;
}
interface FormRadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  infoTooltip?: string;
  inline?: boolean;
}
const FormRadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  helperText,
  error,
  isRequired = false,
  infoTooltip,
  inline = true
}: FormRadioGroupProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return <div className="mb-4">
      {label && <div className="flex items-center mb-2">
          <span className="block text-sm font-medium text-gray-700">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </span>
          {infoTooltip && <div className="relative ml-1 group">
              <Info size={14} className="text-gray-400" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 z-10">
                {infoTooltip}
                <div className="absolute top-full left-0 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
            </div>}
        </div>}
      <div className={`${inline ? 'flex space-x-6' : 'space-y-2'}`}>
        {options.map(option => <div key={option.value} className="flex items-center">
            <input type="radio" id={`${name}-${option.value}`} name={name} value={option.value} checked={value === option.value} onChange={handleChange} className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300" />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
              {option.label}
            </label>
          </div>)}
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default FormRadioGroup;