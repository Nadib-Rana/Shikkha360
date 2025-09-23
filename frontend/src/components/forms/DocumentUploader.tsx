import React, { useRef } from 'react';

interface DocumentUploaderProps {
  label?: string;
  accept?: string;
  onUpload: (file: File) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  label = 'Upload Document',
  accept = '.pdf,.doc,.docx,.jpg,.png',
  onUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Choose File
        </button>
      </div>
    </div>
  );
};

export default DocumentUploader;