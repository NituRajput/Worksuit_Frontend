import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
interface DateInputProps {
  label?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  infoTooltip?: string;
}
const DateInput = ({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  helperText,
  error,
  isRequired = false,
  infoTooltip
}: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleDaySelect = (date: Date | undefined) => {
    onChange(date);
    setIsOpen(false);
  };
  return <div className="mb-4" ref={containerRef}>
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
        <div className={`
            flex items-center justify-between border rounded-md shadow-sm text-sm px-3 py-2 cursor-pointer
            ${error ? 'border-red-300' : 'border-gray-300'}
          `} onClick={() => setIsOpen(!isOpen)}>
          <span className={value ? 'text-gray-900' : 'text-gray-400'}>
            {value ? format(value, 'PP') : placeholder}
          </span>
          <CalendarIcon size={16} className="text-gray-400" />
        </div>
        {isOpen && <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md p-2 border border-gray-200">
            <DayPicker mode="single" selected={value} onSelect={handleDaySelect} className="rdp-custom" classNames={{
          day_selected: 'bg-amber-500 text-white'
        }} />
          </div>}
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default DateInput;