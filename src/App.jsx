import React from 'react';
import Header from './components/Header.jsx';
import PartList from './components/PartList.jsx';
import PartModal from './components/PartModal.jsx';

function App() {
  const parts = [
    'Battery Pack',
    'Electric Motor',
    'Aluminum Chassis',
    'Infotainment System',
  ];

  const selectedPart = null; // placeholder for future state

  const handleSelect = () => {};
  const handleClose = () => {};

  const modalContent = selectedPart
    ? {
        title: selectedPart,
        footprint: 'CO2 footprint details',
        risks: 'Risk info',
        route: 'Route summary',
      }
    : null;

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
          <div className="h-[400px] bg-gray-100 border-dashed border-2 border-gray-300 flex items-center justify-center">
            <span className="text-gray-400">[Mapbox GL JS view here]</span>
          </div>
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
