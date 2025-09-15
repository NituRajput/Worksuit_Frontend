import React, { useState } from 'react';
import { Eye, EyeOff, Info } from 'lucide-react';
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showPasswordToggle?: boolean;
  isRequired?: boolean;
  infoTooltip?: string;
  readOnly?:boolean
  placeholder?:string
}
const FormInput = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  isRequired = false,
  infoTooltip,
  className = '',
  readOnly = false,
  ...props
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const inputType = showPasswordToggle ? showPassword ? 'text' : 'password' : props.type;
  return <div className="mb-4">
      {label && <div className="flex items-center mb-1">
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
        </div>}
      <div className="relative">
        {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>}
        <input  {...props} type={inputType} className={`
            block w-full rounded-md shadow-sm text-sm
            ${leftIcon ? 'pl-10' : 'pl-3'}
            ${showPasswordToggle || rightIcon ? 'pr-10' : 'pr-3'}
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'}
            ${props.disabled ? 'bg-gray-100 text-gray-500' : ''}
            py-2 focus:outline-none focus:ring-2 focus:ring-offset-0
            ${className}
          `} />
        {(showPasswordToggle || rightIcon) && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {showPasswordToggle ? <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button> : rightIcon}
          </div>}
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default FormInput;