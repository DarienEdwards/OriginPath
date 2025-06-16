import React from 'react';

const PartModal = ({ part, onClose }) => {
  if (!part) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 w-96 rounded shadow-lg">
        <h3 className="font-bold text-lg">{part.title}</h3>
        <p className="text-sm mt-2">{part.footprint}</p>
        <p className="text-sm">{part.risks}</p>
        <p className="text-sm">{part.route}</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PartModal;
