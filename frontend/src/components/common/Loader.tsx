import React from 'react';

const Loader: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-4 border-t-blue-500 border-gray-300"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Loader;