export type FlightCategory = 'VFR' | 'MVFR' | 'IFR' | 'LIFR';

const SM_TO_METERS = 1609.34;

export const getFlightCategory = (weatherString: string): FlightCategory | null => {
  if (!weatherString || typeof weatherString !== 'string') {
    return null;
  }

  // Handle cases where data is not available
  if (weatherString === 'N/A' || weatherString === 'Error loading data.') {
    return null;
  }

  let visibilityInMiles = Infinity;
  let ceilingInFeet = Infinity;

  // --- Visibility Parsing ---
  // Improved regex to find visibility, including fractions and standard codes.
  // P6SM = 6+ SM, 1 1/2SM, 1/2SM, 10SM, 9999 (10km+), 3000 (3000m)
  const visRegex = /(P?(\d+\s)?(\d\/\d)?SM|\d{4}(?!\d))/;
  const visMatch = weatherString.match(visRegex);

  if (weatherString.includes('CAVOK')) {
    visibilityInMiles = 10;
    ceilingInFeet = Infinity;
  } else if (visMatch) {
    let visStr = visMatch[0];
    if (visStr.includes('SM')) {
      visStr = visStr.replace('SM', '').trim();
      if (visStr.startsWith('P')) { // P6SM -> 6+
        visibilityInMiles = parseFloat(visStr.substring(1));
      } else if (visStr.includes(' ')) { // "1 1/2"
        const [whole, frac] = visStr.split(' ');
        const [num, den] = frac.split('/').map(Number);
        visibilityInMiles = Number(whole) + (num / den);
      } else if (visStr.includes('/')) { // "1/2"
        const [num, den] = visStr.split('/').map(Number);
        visibilityInMiles = num / den;
      } else {
        visibilityInMiles = parseFloat(visStr);
      }
    } else if (visStr === '9999') {
      visibilityInMiles = 7; // Standard for 10km+
    } else { // Meters
      visibilityInMiles = Number(visStr) / SM_TO_METERS;
    }
  }

  // --- Ceiling Parsing ---
  // A ceiling is the first 'Broken' (BKN) or 'Overcast' (OVC) layer.
  const cloudRegex = /(BKN|OVC)(\d{3})/g;
  let match;
  while ((match = cloudRegex.exec(weatherString)) !== null) {
    const cloudAltitude = parseInt(match[2], 10) * 100;
    // The lowest BKN or OVC layer is the ceiling
    if (cloudAltitude < ceilingInFeet) {
      ceilingInFeet = cloudAltitude;
    }
  }

  // --- Determine Category based on lowest value ---
  if (visibilityInMiles < 1 || ceilingInFeet < 500) {
    return 'LIFR';
  }
  if (visibilityInMiles < 3 || ceilingInFeet < 1000) {
    return 'IFR';
  }
  if (visibilityInMiles <= 5 || ceilingInFeet <= 3000) {
    return 'MVFR';
  }

  return 'VFR';
};
