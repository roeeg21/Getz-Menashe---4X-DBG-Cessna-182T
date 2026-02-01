export type ChecklistItem = {
  id: string;
  label: string;
};

export type ChecklistSection = {
  id: string;
  title: string;
  items: ChecklistItem[];
  notes?: string[];
};

export const PREFLIGHT_CHECKLIST: ChecklistSection[] = [
  {
    id: 'preflight_cabin',
    title: 'Cabin Preflight Inspection',
    notes: ["REMOVE GUST LOCKS & PITOT COVER IF INSTALLED"],
    items: [
      { id: 'preflight_cabin-1', label: 'Fuel Quantities — CHECK' },
      { id: 'preflight_cabin-2', label: 'Inspections — CHECK DATES and TIMES' },
      { id: 'preflight_cabin-3', label: 'Weight and CG — WITHIN LIMITS' },
      { id: 'preflight_cabin-4', label: 'Documents — CHECK' },
      { id: 'preflight_cabin-5', label: 'Control Wheel Lock — REMOVE' },
      { id: 'preflight_cabin-6', label: 'Ignition Switch — OFF' },
      { id: 'preflight_cabin-7', label: 'Avionics Switch — OFF' },
      { id: 'preflight_cabin-8', label: 'Master Switch — ON' },
      { id: 'preflight_cabin-9', label: 'Avionics Switch — ON' },
      { id: 'preflight_cabin-10', label: 'Avionics Cooling Fan — CHECK ON' },
      { id: 'preflight_cabin-11', label: 'Avionics Switch — OFF' },
      { id: 'preflight_cabin-12', label: 'Fuel Quantity Indicators — CHECK' },
      { id: 'preflight_cabin-13', label: 'Flaps — EXTEND' },
      { id: 'preflight_cabin-14', label: 'Interior and Exterior Lights — CHECK' },
      { id: 'preflight_cabin-15', label: 'Pitot Heat — CHECK THEN OFF' },
      { id: 'preflight_cabin-16', label: 'Stall Warning Vane — CHECK' },
      { id: 'preflight_cabin-17', label: 'Master Switch — OFF' },
      { id: 'preflight_cabin-18', label: 'Cowl Flaps — OPEN' },
      { id: 'preflight_cabin-19', label: 'Fuel Selector Valve — BOTH' },
      { id: 'preflight_cabin-20', label: 'Fire Extinguisher — CHECK CHARGE' }
    ]
  },
  {
    id: 'preflight_exterior_empennage',
    title: 'EXTERIOR PREFLIGHT INSPECTION — Empennage',
    items: [
      { id: 'preflight_exterior_empennage-1', label: 'Antennas — CHECK' },
      { id: 'preflight_exterior_empennage-2', label: 'Baggage Door — LOCKED' },
      { id: 'preflight_exterior_empennage-3', label: 'Left Side of Fuselage — CHECK' },
      { id: 'preflight_exterior_empennage-4', label: 'Control Surfaces — CHECK' },
      { id: 'preflight_exterior_empennage-5', label: 'Tail Tie-down — REMOVE' },
      { id: 'preflight_exterior_empennage-6', label: 'Position Light — CHECK' },
      { id: 'preflight_exterior_empennage-7', label: 'Right Side of Fuselage — CHECK' }
    ]
  },
  {
    id: 'preflight_exterior_right_wing',
    title: 'EXTERIOR PREFLIGHT INSPECTION — Right Wing',
    items: [
      { id: 'preflight_exterior_right_wing-1', label: 'Flap and Aileron — CHECK' },
      { id: 'preflight_exterior_right_wing-2', label: 'Position Light — CHECK' },
      { id: 'preflight_exterior_right_wing-3', label: 'Strobe — CHECK' },
      { id: 'preflight_exterior_right_wing-4', label: 'Wing — CHECK' },
      { id: 'preflight_exterior_right_wing-5', label: 'Fuel Tank Vent — CHECK for BLOCKAGE' },
      { id: 'preflight_exterior_right_wing-6', label: 'Wing Tie-down — REMOVE' },
      { id: 'preflight_exterior_right_wing-7', label: 'Wing Root Vents — CHECK' },
      { id: 'preflight_exterior_right_wing-8', label: 'Wheel Assembly — CHECK' },
      { id: 'preflight_exterior_right_wing-9', label: 'Fuel Tank Sumps — (5) DRAIN and CHECK' },
      { id: 'preflight_exterior_right_wing-10', label: 'Fuel Quantity — CHECK / CAP SECURE' }
    ]
  },
  {
    id: 'preflight_exterior_nose',
    title: 'EXTERIOR PREFLIGHT INSPECTION — Nose',
    items: [
      { id: 'preflight_exterior_nose-1', label: 'Right Side Static Port — CHECK' },
      { id: 'preflight_exterior_nose-2', label: 'Fuel Sumps — (3) DRAIN and CHECK' },
      { id: 'preflight_exterior_nose-3', label: 'Cowling, Propeller and Spinner — CHECK' },
      { id: 'preflight_exterior_nose-4', label: 'Air Inlets — CLEAR' },
      { id: 'preflight_exterior_nose-5', label: 'Air Filter — CHECK' },
      { id: 'preflight_exterior_nose-6', label: 'Nose Wheel Assembly — CHECK' },
      { id: 'preflight_exterior_nose-7', label: 'Oil Quantity — (5-9 quarts) CHECK' },
      { id: 'preflight_exterior_nose-8', label: 'Left Side Static Port — CHECK' },
      { id: 'preflight_exterior_nose-9', label: 'Windshield — CLEAN and CHECK' }
    ]
  },
  {
    id: 'preflight_exterior_left_wing',
    title: 'EXTERIOR PREFLIGHT INSPECTION — Left Wing',
    items: [
      { id: 'preflight_exterior_left_wing-1', label: 'Fuel Tank Sumps — (5) DRAIN and CHECK' },
      { id: 'preflight_exterior_left_wing-2', label: 'Fuel Quantity — CHECK / CAP SECURE' },
      { id: 'preflight_exterior_left_wing-3', label: 'Wing Root Vents — CHECK' },
      { id: 'preflight_exterior_left_wing-4', label: 'Pitot Tube — CHECK' },
      { id: 'preflight_exterior_left_wing-5', label: 'Stall Warning Opening — CHECK for BLOCKAGE' },
      { id: 'preflight_exterior_left_wing-6', label: 'Wing Tie-down — REMOVE' },
      { id: 'preflight_exterior_left_wing-7', label: 'Fuel Tank Vent — CHECK for BLOCKAGE' },
      { id: 'preflight_exterior_left_wing-8', label: 'Wing — CHECK' },
      { id: 'preflight_exterior_left_wing-9', label: 'Position Light — CHECK' },
      { id: 'preflight_exterior_left_wing-10', label: 'Strobe — CHECK' },
      { id: 'preflight_exterior_left_wing-11', label: 'Flap and Aileron — CHECK' },
      { id: 'preflight_exterior_left_wing-12', label: 'Wheel Assembly — CHECK' }
    ]
  }
];

export const SOURCE_NOTES = [
  "FOR TRAINING PURPOSES ONLY",
  "This is an abbreviated checklist. Most explanatory items, notes cautions and warnings have been omitted for brevity.",
  "Procedures in red/bold in this checklist should be committed to memory.",
  "All performance speeds should be computed prior to flight using the Aircraft Owner’s Manual.",
  "Users must be familiar with and operate in accordance with the official Aircraft Owner’s Manual."
];
