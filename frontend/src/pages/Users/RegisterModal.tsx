import React from 'react';
import Register from '../Auth/Register';

interface Props {
  onClose: () => void;
}

const RegisterModal: React.FC<Props> = ({ onClose }) => (
  <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Register New User</h3>
      <Register />
      <button onClick={onClose} className="mt-4 text-gray-600 hover:underline">Close</button>
    </div>
  </div>
);

export default RegisterModal;