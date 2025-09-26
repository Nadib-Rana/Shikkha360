// components/common/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC<{ label?: string }> = ({ label = 'Back' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700 transition"
    >
      ← {label}
    </button>
  );
};

export default BackButton;