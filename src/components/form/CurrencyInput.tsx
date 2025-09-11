import React from 'react';
import { Info } from 'lucide-react';
interface CurrencyInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  currency?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  infoTooltip?: string;
}
const CurrencyInput = ({
  label,
  value,
  onChange,
  currency = '$',
  placeholder = '0.00',
  helperText,
  error,
  isRequired = false,
  infoTooltip
}: CurrencyInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const val = e.target.value.replace(/[^0-9.]/g, '');
    onChange(val);
  };
  return <div className="mb-4">
      {label && <div className="flex items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
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
        </div>}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">{currency}</span>
        </div>
        <input type="text" value={value} onChange={handleChange} placeholder={placeholder} className={`
            block w-full rounded-md shadow-sm text-sm pl-8 pr-3 py-2
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'}
          `} />
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default CurrencyInput;