# OriginPath

**OriginPath** is a web-based supply chain visualization platform built to help analysts, engineers, and sustainability teams trace the full lifecycle of hardware components — from raw material extraction to global manufacturing and final assembly.

Our first focus is the **Tesla Model 3**, using real-world data and modular visualization tools to tell the story behind its most critical components.

Built with JavaScript, React, and Mapbox, OriginPath empowers users to unpack complex supply chains, surface ethical and environmental risks, and explore "what-if" sourcing alternatives.

---

## Current Focus: Tesla Model 3

Explore the supply paths for key components such as:

- Lithium-ion battery packs  
- Aluminum chassis  
- Rare earth magnets in motors  
- Onboard computing and sensors  

Each part is unpacked to show:

- Raw material origins (country, region)  
- Processing and refining facilities  
- Global shipping routes  
- Final assembly sites  
- Environmental footprint (CO₂ per kg)  
- Ethical risk tags (e.g., labor concerns, pollution zones)  

---

## Key Features

- **Interactive Component Tree**  
  Click into parts of the Tesla Model 3 to view subcomponents and sourcing data.

- **Map View**  
  Visualize each part’s journey from mine to factory to assembly line.

- **Risk Flags**  
  Surface environmental, political, and labor risks by region or stage.

- **What-If Simulator**  
  Explore alternative sourcing options and compare tradeoffs in emissions or risk.

- **Exportable Reports**
  Download clean reports for presentations, education, or internal review.

- **AI Insights Panel**
  Generate sustainability and geopolitical analysis for each component using OpenAI.

- **Risk Scoring Engine**
  Calculate risk scores based on regions and material types to prioritize concerns.

- **Supply Parser**
  Automatically map components to their sourcing locations for richer visualization.

---

## Tech Stack

- **Frontend**: React, TailwindCSS  
- **Visualization**: D3.js / SVG for interactive trees  
- **Mapping**: Mapbox GL JS  
- **Data Layer**: JSON (MVP), Supabase (future)
- **Export**: html2pdf or jsPDF for on-demand report generation

## Setup

This project can run without a build step by opening `public/index.html` directly.
Ensure you have an internet connection as React, Tailwind and Mapbox are loaded from CDNs.
Edit the `MAPBOX_TOKEN` variable in that file with your Mapbox access token.

For development with Vite:

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm start
```

---

## Folder Structure

originpath/
├── public/
├── src/
│ ├── components/
│ │ ├── PartTree.jsx
│ │ ├── MapView.jsx
│ │ ├── ModalDetails.jsx
│ │ ├── WhatIfSimulator.jsx
│ ├── data/
│ │ ├── teslaModel3.json
│ │ └── locations.json
│ ├── utils/
│ │ ├── supplyParser.js
│ │ └── riskEngine.js
│ ├── App.jsx
│ └── main.jsx
├── README.md
├── package.json


---

## Future Development

OriginPath will expand deeper into the Tesla ecosystem across the DREAMS stack: **Data, Robotics, Energy, AI, Manufacturing, and Space.**

### Phase 1: Tesla Model 3 (Core)
- Battery packs (Li-ion, cobalt, nickel, graphite)  
- Powertrain/motor (neodymium, steel, copper)  
- Aluminum frame  
- Infotainment system (chips, touchscreens, memory)  
- Wiring & harnesses  

### Phase 2: Energy Products
- Powerwall / Megapack  
- Solar roof tiles  
- Inverters + grid storage  
- Material sourcing for clean energy  

### Phase 3: Robotics & Manufacturing
- Optimus humanoid robot (future use case)  
- Gigafactory robotics: casting, stamping, welding  
- Sensor modules and automation systems  

### Phase 4: AI & Compute
- Dojo chips and AI training stack  
- Full Self-Driving (FSD) hardware  
- Data infrastructure and signal hardware  

### Phase 5: GigaGlobal View
- Global factory map: Fremont, Shanghai, Berlin, Austin, Mexico  
- Real-time export paths and trade maps  
- Emissions and risk overlays per territory

### Phase 6: Space Frontier
- Supply chains for reusable rockets
- Satellite component traceability
- Mapping materials for other space technologies

---

## License

MIT — built for transparency, ethics, and education.

---

> Made with brains and passion by Darien Edwards.  
> Let’s unpack the future.
