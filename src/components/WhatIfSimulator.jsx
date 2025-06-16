import React, { useState } from 'react';
import { calculateRisk } from '../utils/riskEngine.js';

const regions = ['North America', 'Europe', 'Asia'];

const WhatIfSimulator = ({ component }) => {
  const [region, setRegion] = useState('');
  if (!component) return null;

  const originalRisk = calculateRisk(component);
  const simulated = { ...component, region, locations: [{ ...component.locations?.[0], region }] };
  const newRisk = region ? calculateRisk(simulated) : originalRisk;
  const diff = newRisk - originalRisk;

  return (
    <div className="p-2 bg-gray-100 rounded mt-2">
      <h4 className="font-semibold mb-1">What-If Simulator</h4>
      <select
        className="border p-1 mr-2"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="">Select region</option>
        {regions.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      {region && (
        <div className="text-sm mt-1">
          New Risk: {newRisk} ({diff >= 0 ? '+' : ''}{diff})
        </div>
      )}
    </div>
  );
};

export default WhatIfSimulator;
