export function parseSupplyData(componentsJson = {}, locationsJson = {}) {
  const components = Array.isArray(componentsJson.components)
    ? componentsJson.components
    : [];
  const locations = Array.isArray(locationsJson.locations)
    ? locationsJson.locations
    : [];

  const byId = {};
  components.forEach((comp) => {
    byId[comp.id] = { ...comp, locations: [] };
  });

  locations.forEach((loc) => {
    if (byId[loc.componentId]) {
      byId[loc.componentId].locations.push(loc);
    }
  });

  return {
    components: byId,
    locations,
  };
}
