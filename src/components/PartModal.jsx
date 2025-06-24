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
        <button
  className="absolute top-2 right-2 text-gray-500 hover:text-black"
  onClick={onClose}
>
  ✕
</button>

      </div>
    </div>
  );
};

export default PartModal;
