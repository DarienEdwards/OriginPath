import React, { useState } from 'react';

// Static list of Tesla Model 3 parts for the sidebar
const parts = ['Battery', 'Motor', 'Chassis'];

function App() {
  // Track which part is selected and whether the info modal is visible
  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // When a part is clicked, open the modal with that part's name
  const handlePartClick = (part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => setShowModal(false);

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
          <ul className="space-y-1">
            {parts.map((part) => (
              <li key={part}>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handlePartClick(part)}
                >
                  {part}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Map placeholder */}
        <main className="flex-1 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500">Map Placeholder</div>
        </main>
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-xl w-80">
            <h3 className="text-lg font-bold mb-2">{selectedPart}</h3>
            <p className="text-sm text-gray-700">
              Supply chain details coming soon...
            </p>
            <button
              className="mt-4 text-blue-600 hover:underline"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
