import React, { useState } from 'react';
import Header from './components/Header.jsx';
import PartList from './components/PartList.jsx';
import MapView from './components/MapView.jsx';
import locationsJson from './data/locations.json';

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
  const [insight, setInsight] = useState(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const parts = Object.keys(partData);

  const handleSelect = (part) => {
    const details = partData[part];
    if (details) {
      setSelectedPart({ title: part, ...details });
      setInsight(null); // Reset insight when switching parts
    }
  };

  const getLocationsForPart = (partName) => {
    if (!partName) return [];
    return locationsJson.locations.filter((loc) => loc.componentId === partName.toLowerCase().replace(' ', ''));
  };

  const handleRegenerateInsight = async () => {
    if (!selectedPart) return;
    setLoadingInsight(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an environmental analyst providing geopolitical and sustainability insights.',
            },
            {
              role: 'user',
              content: `Give me a brief analysis of environmental and geopolitical risks for this part: ${selectedPart.title}, with this route: ${selectedPart.route}, and these risks: ${selectedPart.risks}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || 'No insight returned.';
      setInsight(text.trim());
    } catch (err) {
      setInsight('Error retrieving insight.');
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <div className="app-container">
      <Header title="OriginPath" subtitle="Trace the supply chain of the Tesla Model 3" />

      <main className="grid grid-cols-3 gap-4 p-4">
        <PartList parts={parts} onSelect={handleSelect} />

        <section className="col-span-2 grid grid-cols-3 gap-4">
          <div className="col-span-2 border p-4 relative h-96">
            <h2 className="font-semibold text-lg mb-2">Supply Chain Map</h2>
            <MapView locations={getLocationsForPart(selectedPart?.title)} />
          </div>

          {selectedPart && (
            <div className="col-span-1 border p-4 bg-white rounded shadow-md h-96 overflow-y-auto">
              <h2 className="font-bold text-lg mb-2">{selectedPart.title}</h2>
              <p className="mb-2">{selectedPart.footprint}</p>
              <p className="mb-2">{selectedPart.risks}</p>
              <p className="mb-2">{selectedPart.route}</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">🧠 AI Insights Panel</h3>
                <p className="text-sm whitespace-pre-wrap">{insight || 'No insight returned.'}</p>
                <button
                  onClick={handleRegenerateInsight}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  disabled={loadingInsight}
                >
                  {loadingInsight ? 'Generating...' : 'Regenerate Insights'}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="p-4 border-t text-sm text-gray-500 text-center">
        Built by Darien Edwards — MIT License
      </footer>
    </div>
  );
}

export default App;
