import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import PartList from './components/PartList.jsx';
import PartModal from './components/PartModal.jsx';
import MapView from './components/MapView.jsx';
import AIInsights from './components/AIInsights.jsx';
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
  const [insight, setInsight] = useState('');
  const [aiInsight, setAiInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const parts = Object.keys(partData);

  const handleSelect = (part) => {
    const details = partData[part];
    if (details) {
      setSelectedPart({ title: part, ...details });
      setAiInsight('');
    }
  };

  const getLocationsForPart = (partName) => {
    if (!partName) return [];
    if (partName === 'Battery Pack') return locationsJson.locations.filter(loc => loc.componentId === 'battery');
    if (partName === 'Electric Motor') return locationsJson.locations.filter(loc => loc.componentId === 'motor');
    if (partName === 'Aluminum Chassis') return locationsJson.locations.filter(loc => loc.componentId === 'chassis');
    if (partName === 'Infotainment System') return locationsJson.locations.filter(loc => loc.componentId === 'infotainment');
    return [];
  };

  const generateInsight = async (partName) => {
    if (!partName) return;
    setLoading(true);
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert on supply chains and sustainability.',
            },
            {
              role: 'user',
              content: `Explain the environmental and geopolitical risks of the ${partName} in an electric car.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
  
      const aiText = response.data.choices[0].message.content;
      setAiInsight(aiText); // ✅ CORRECT ONE
    } catch (err) {
      console.error('Failed to fetch AI insight:', err);
      setAiInsight('Sorry, we couldn’t fetch insights at this time.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="app-container min-h-screen flex flex-col">
      <Header
        title="OriginPath"
        subtitle="Trace the supply chain of the Tesla Model 3"
      />

      <main className="flex flex-1 p-4 gap-4">
        {/* Sidebar */}
        <div className="w-1/4">
          <PartList parts={parts} onSelect={handleSelect} />
        </div>

        {/* Map and Details */}
        <div className="w-3/4 flex gap-4">
          {/* Map */}
          <section className="w-2/3 border p-4 relative h-[550px] rounded">
            <h2 className="font-semibold text-lg mb-2">Supply Chain Map</h2>
            <MapView locations={getLocationsForPart(selectedPart?.title)} />
          </section>

          {/* Details + AI */}
          <aside className="w-1/3 border p-4 rounded bg-white">
            {selectedPart ? (
              <>
                <h3 className="text-lg font-bold mb-2">{selectedPart.title}</h3>
                <p className="text-sm mb-1">{selectedPart.footprint}</p>
                <p className="text-sm mb-1">{selectedPart.risks}</p>
                <p className="text-sm mb-3">{selectedPart.route}</p>

                <div className="mt-4 p-3 border rounded bg-gray-50">
                  <h4 className="font-semibold mb-2">🧠 AI Insights Panel</h4>
                  {aiInsight ? (
                    <p className="text-sm whitespace-pre-line">{aiInsight}</p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No insight yet.</p>
                  )}

                  <button
                    className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => generateInsight(selectedPart.title)}
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Generate Insight'}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm italic">Select a part to view details.</p>
            )}
          </aside>
        </div>
      </main>

      <footer className="p-4 border-t text-sm text-gray-500 text-center">
        Built by Darien Edwards — MIT License
      </footer>
    </div>
  );
}

export default App;