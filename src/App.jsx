import React, { useState, useEffect } from 'react';
import PartTree from './components/PartTree.jsx';
import MapView from './components/MapView.jsx';
import ModalDetails from './components/ModalDetails.jsx';
import WhatIfSimulator from './components/WhatIfSimulator.jsx';
import { parseSupplyData } from './utils/supplyParser.js';
import componentsJson from './data/teslaModel3.json';
import locationsJson from './data/locations.json';

function App() {
  const [data, setData] = useState({ components: {}, locations: [] });
  const [selectedPart, setSelectedPart] = useState(null);

  useEffect(() => {
    setData(parseSupplyData(componentsJson, locationsJson));
  }, []);

  const handlePartClick = (part) => {
    setSelectedPart(part);
  };

  const closeModal = () => setSelectedPart(null);

  return (
    // Full-height layout split into header, sidebar, and main map area
    <div className="h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">OriginPath</h1>
      </header>

      {/* Sidebar and map container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="font-semibold mb-2">Tesla Model 3 Parts</h2>
          <PartTree data={data.components} onSelect={handlePartClick} />
        </aside>

        <main className="flex-1 bg-gray-200">
          <MapView locations={selectedPart ? selectedPart.locations : data.locations} />
        </main>
      </div>

      {selectedPart && (
        <ModalDetails component={selectedPart} onClose={closeModal} />
      )}

      <div className="absolute bottom-4 right-4">
        <WhatIfSimulator component={selectedPart} />
      </div>
    </div>
  );
}

export default App;
