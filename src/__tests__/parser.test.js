import { parseSupplyData } from '../utils/supplyParser.js';

describe('parseSupplyData', () => {
  it('maps locations to components', () => {
    const comps = { components: [{ id: 'a', name: 'A' }] };
    const locs = { locations: [{ id: 1, componentId: 'a' }] };
    const result = parseSupplyData(comps, locs);
    expect(result.components.a.locations.length).toBe(1);
  });
});
