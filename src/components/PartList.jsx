import React from 'react';

const PartList = ({ parts = [], onSelect }) => (
  <section className="col-span-1 border p-4">
    <h2 className="font-semibold text-lg mb-2">Model 3 Components</h2>
    <ul className="text-sm space-y-2">
      {parts.map((part) => (
        <li key={part}>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => onSelect && onSelect(part)}
          >
            {part}
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export default PartList;
