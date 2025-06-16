import React from 'https://esm.sh/react@18.2.0';
import { calculateRisk } from '../utils/riskEngine.js';

const ModalDetails = ({ component, onClose }) => {
  if (!component) return null;

  const risk = calculateRisk(component);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-xl w-80">
        <h3 className="text-lg font-bold mb-2">{component.name}</h3>
        <p className="text-sm mb-2">Risk Score: {risk}</p>
        {component.locations && component.locations.length > 0 && (
          <ul className="text-sm list-disc ml-4">
            {component.locations.map((l) => (
              <li key={l.id}>{l.name} ({l.region})</li>
            ))}
          </ul>
        )}
        <button
          className="mt-4 text-blue-600 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalDetails;
