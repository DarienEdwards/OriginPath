import { calculateRisk } from '../utils/riskEngine.js';

describe('calculateRisk', () => {
  it('adds region and material risk', () => {
    const item = { region: 'Asia', materialType: 'Cobalt' };
    expect(calculateRisk(item)).toBeGreaterThan(0);
  });
});
