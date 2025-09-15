import React, { TextareaHTMLAttributes } from 'react';
import { Info } from 'lucide-react';
interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  infoTooltip?: string;
  placeholder?:string
}
const FormTextarea = ({
  label,
  helperText,
  error,
  isRequired = false,
  infoTooltip,
  className = '',
  ...props
}: FormTextareaProps) => {
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
      <textarea {...props} className={`
          block w-full rounded-md shadow-sm text-sm
          ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'}
          ${props.disabled ? 'bg-gray-100 text-gray-500' : ''}
          p-3 focus:outline-none focus:ring-2 focus:ring-offset-0
          ${className}
        `} />
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default FormTextarea;