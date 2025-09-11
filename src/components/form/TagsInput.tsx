import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
interface TagsInputProps {
  label?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  infoTooltip?: string;
}
const TagsInput = ({
  label,
  tags,
  onChange,
  placeholder = 'Type and press Enter',
  helperText,
  error,
  isRequired = false,
  infoTooltip
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };
  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      onChange([...tags, trimmedValue]);
      setInputValue('');
    }
  };
  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
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
      <div className={`
        border rounded-md shadow-sm p-2 flex flex-wrap gap-2
        ${error ? 'border-red-300' : 'border-gray-300 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500'}
      `}>
        {tags.map((tag, index) => <div key={index} className="bg-gray-100 text-gray-800 text-sm rounded-md py-1 px-2 flex items-center">
            <span>{tag}</span>
            <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-gray-500 hover:text-gray-700">
              <X size={14} />
            </button>
          </div>)}
        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} onBlur={addTag} placeholder={tags.length === 0 ? placeholder : ''} className="flex-1 min-w-[120px] outline-none text-sm py-1" />
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default TagsInput;