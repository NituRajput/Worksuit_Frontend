import React from 'react';
import { Info, ChevronDown } from 'lucide-react';
interface Option {
  value: string;
  label: string;
}
interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  infoTooltip?: string;
  onChange?: (value: string) => void;
  rightElement?: ReactNode;
}
const FormSelect = ({
  label,
  options,
  helperText,
  error,
  isRequired = false,
  infoTooltip,
  onChange,
  rightElement,
  className = '',
  ...props
}: FormSelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return <div className="mb-4">
      {label && <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
              {label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            {infoTooltip && <div className="relative ml-1 group">
                <Info size={14} className="text-gray-400" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 z-10">
                  {infoTooltip}
                  <div className="absolute top-full left-0 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                </div>
              </div>}
          </div>
          {rightElement && <div>{rightElement}</div>}
        </div>}
      <div className="relative">
        <select {...props} onChange={handleChange} className={`
            block w-full rounded-md shadow-sm text-sm border-gray-300 
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'focus:ring-amber-500 focus:border-amber-500'}
            ${props.disabled ? 'bg-gray-100 text-gray-500' : ''}
            py-2 pl-3 pr-10 appearance-none
            ${className}
          `}>
          <option value="" disabled>
            Select an option
          </option>
          {options.map(option => <option key={option.value} value={option.value}>
              {option.label}
            </option>)}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default FormSelect;