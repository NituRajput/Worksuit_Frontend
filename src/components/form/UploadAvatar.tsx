import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, Info, X } from 'lucide-react';
interface UploadAvatarProps {
  label?: string;
  value: File | null;
  preview: string | null;
  onChange: (file: File | null) => void;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  infoTooltip?: string;
}
const UploadAvatar = ({
  label,
  value,
  preview,
  onChange,
  helperText,
  error,
  isRequired = false,
  infoTooltip
}: UploadAvatarProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onChange(acceptedFiles[0]);
    }
  }, [onChange]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880,
    multiple: false
  });
  const removeFile = () => {
    onChange(null);
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
      {!preview ? <div {...getRootProps()} className={`
            border-2 border-dashed rounded-md p-6 text-center cursor-pointer
            ${isDragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-amber-500'}
            ${error ? 'border-red-300' : ''}
          `}>
          <input {...getInputProps()} />
          <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Choose a file or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
        </div> : <div className="relative w-24 h-24">
          <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover border border-gray-200" />
          <button type="button" onClick={removeFile} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600">
            <X size={16} />
          </button>
        </div>}
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>;
};
export default UploadAvatar;