import React, { useState } from 'react';
import Header from './components/Header.jsx';
import PartList from './components/PartList.jsx';
import PartModal from './components/PartModal.jsx';
import MapView from './components/MapView.jsx';

const partData = {
  'Battery Pack': {
    footprint: 'CO₂ Footprint: 312.5 kg',
    risks: 'Risks: Water Depletion, Export Restrictions',
    route: 'Route: Chile → China → Nevada',
  },
  'Electric Motor': {
    footprint: 'CO₂ Footprint: 190.2 kg',
    risks: 'Risks: Rare Earth Extraction, Smelting Emissions',
    route: 'Route: Inner Mongolia → Guangdong → California',
  },
  'Aluminum Chassis': {
    footprint: 'CO₂ Footprint: 210.4 kg',
    risks: 'Risks: High Energy Use, Smelting Waste',
    route: 'Route: Quebec → Texas → Fremont',
  },
  'Infotainment System': {
    footprint: 'CO₂ Footprint: 142.8 kg',
    risks: 'Risks: E-waste, Conflict Minerals',
    route: 'Route: Taiwan → China → Nevada',
  },
};

function App() {
  const [selectedPart, setSelectedPart] = useState(null);

  const parts = Object.keys(partData);

  const handleSelect = (part) => {
    const details = partData[part];
    if (details) {
      setSelectedPart({ title: part, ...details });
    }
  };

  const handleClose = () => setSelectedPart(null);

  const modalContent = selectedPart;

  return (
    <div className="app-container">
      <Header
        title="OriginPath"
        subtitle="Trace the supply chain of the Tesla Model 3"
      />

      <main className="grid grid-cols-3 gap-4 p-4">
        <PartList parts={parts} onSelect={handleSelect} />

        <section className="col-span-2 border p-4 relative">
          <h2 className="font-semibold text-lg mb-2">Supply Chain Map</h2>
          <MapView locations={selectedPart ? selectedPart.locations : data.locations} />
        </section>
      </main>

      <footer className="p-4 border-t text-sm text-gray-500 text-center">
        Built by Darien Edwards — MIT License
      </footer>

      <PartModal part={modalContent} onClose={handleClose} />
    </div>
  );
}

export default App;
