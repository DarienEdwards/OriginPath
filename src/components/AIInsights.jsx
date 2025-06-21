import React from 'react';

const generateInsights = (title, risks, route) => {
  if (!title || !risks || !route) return 'No insights available.';

  const base = `Analyzing the ${title.toLowerCase()}, we observe the following:`;

  let insights = '';

  if (risks.includes('Water')) {
    insights += ' Potential water scarcity issues due to extraction or refining processes.';
  }
  if (risks.includes('Rare Earth')) {
    insights += ' Supply chain dependency on rare earth elements increases geopolitical tension.';
  }
  if (risks.includes('Conflict')) {
    insights += ' Risk of contributing to conflict financing due to origin of materials.';
  }
  if (route.includes('China')) {
    insights += ' Centralized manufacturing in China may be vulnerable to export restrictions or trade disputes.';
  }
  if (risks === '' || insights === '') {
    insights += ' No significant red flags detected based on current metadata.';
  }

  return `${base}${insights}`;
};

const AIInsights = ({ part }) => {
  if (!part) return null;

  const summary = generateInsights(part.title, part.risks, part.route);

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50 shadow-sm">
      <h3 className="font-bold text-md mb-2">🧠 AI Insights</h3>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        {summary}
      </p>
    </div>
  );
};

export default AIInsights;
