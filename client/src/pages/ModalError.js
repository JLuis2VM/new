// Modal.js
import React from 'react';

const ModalError = ({ isOpen, onClose, message }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-50 bg-white p-6 rounded shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Error</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            X
          </button>
        </div>
        <p className="mt-4">{message}</p>
      </div>
    </div>
  );
};

export default ModalError;
