const REGION_RISK = {
  'Asia': 3,
  'Europe': 2,
  'North America': 1,
};

const MATERIAL_RISK = {
  'Cobalt': 5,
  'Lithium': 3,
  'Rare Earth': 4,
};

export function calculateRisk(item) {
  if (!item) return 0;

  let score = 0;

  if (item.region && REGION_RISK[item.region]) {
    score += REGION_RISK[item.region];
  }

  if (item.materialType && MATERIAL_RISK[item.materialType]) {
    score += MATERIAL_RISK[item.materialType];
  }

  if (Array.isArray(item.locations)) {
    return item.locations.reduce((sum, loc) => sum + calculateRisk(loc), score);
  }

  return score;
}
