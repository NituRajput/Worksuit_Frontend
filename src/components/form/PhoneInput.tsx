import React from 'react';
import { Info } from 'lucide-react';
interface PhoneInputProps {
  label?: string;
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  infoTooltip?: string;
  placeholder?: string;
}
// Simplified country codes for demo
const countryCodes = [{
  code: '+1',
  country: 'US'
}, {
  code: '+44',
  country: 'GB'
}, {
  code: '+91',
  country: 'IN'
}, {
  code: '+61',
  country: 'AU'
}, {
  code: '+49',
  country: 'DE'
}];
const PhoneInput = ({
  label,
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  helperText,
  error,
  isRequired = false,
  infoTooltip,
  placeholder = 'e.g. 1234567890'
}: PhoneInputProps) => {
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
      <div className="flex">
        <div className="w-24 mr-2">
          <select value={countryCode} onChange={e => onCountryCodeChange(e.target.value)} className="block w-full rounded-md shadow-sm text-sm border-gray-300 focus:ring-amber-500 focus:border-amber-500 py-2">
            {countryCodes.map(country => <option key={country.code} value={country.code}>
                {country.code} {country.country}
              </option>)}
          </select>
        </div>
        <div className="flex-1">
          <input type="tel" value={phoneNumber} onChange={e => onPhoneNumberChange(e.target.value)} placeholder={placeholder} className={`
              block w-full rounded-md shadow-sm text-sm py-2 px-3
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'}
            `} />
        </div>
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default PhoneInput;