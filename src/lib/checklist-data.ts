export type ChecklistItem = {
  id: string;
  label: string;
};

export type ChecklistSection = {
  id: string;
  title: string;
  items: ChecklistItem[];
};

export const PREFLIGHT_CHECKLIST: ChecklistSection[] = [
  {
    id: 'cabin',
    title: '1. Cabin Preflight Inspection',
    items: [
      { id: 'cabin-1', label: 'Fuel Quantities — CHECK' },
      { id: 'cabin-2', label: 'Inspections — CHECK DATES and TIMES' },
      { id: 'cabin-3', label: 'Weight and Balance — WITHIN LIMITS' },
      { id: 'cabin-4', label: 'Documents — CHECK' },
      { id: 'cabin-5', label: 'Control Wheel Lock — REMOVE' },
      { id: 'cabin-6', label: 'Ignition Switch — OFF' },
      { id: 'cabin-7', label: 'Avionics Switch — OFF' },
      { id: 'cabin-8', label: 'Master Switch — ON' },
      { id: 'cabin-9', label: 'Avionics Switch — ON' },
      { id: 'cabin-10', label: 'Avionics Cooling Fan — CHECK ON' },
      { id: 'cabin-11', label: 'Avionics Switch — OFF' },
      { id: 'cabin-12', label: 'Fuel Quantity Indicators — CHECK' },
      { id: 'cabin-13', label: 'Flaps — EXTEND' },
      { id: 'cabin-14', label: 'Interior and Exterior Lights — CHECK' },
      { id: 'cabin-15', label: 'Pitot Heat — CHECK, then OFF' },
      { id: 'cabin-16', label: 'Stall Warning Vane — CHECK' },
      { id: 'cabin-17', label: 'Master Switch — OFF' },
      { id: 'cabin-18', label: 'Cowl Flaps — OPEN' },
      { id: 'cabin-19', label: 'Fuel Selector Valve — BOTH' },
      { id: 'cabin-20', label: 'Fire Extinguisher — CHECK CHARGE' },
    ],
  },
  {
    id: 'empennage',
    title: '2. Exterior Preflight — Empennage',
    items: [
      { id: 'emp-1', label: 'Antennas — CHECK' },
      { id: 'emp-2', label: 'Baggage Door — LOCKED' },
      { id: 'emp-3', label: 'Left Side of Fuselage — CHECK' },
      { id: 'emp-4', label: 'Elevator and Trim Tab — CHECK' },
      { id: 'emp-5', label: 'Rudder — CHECK' },
      { id: 'emp-6', label: 'Tail Tie-Down — REMOVE' },
      { id: 'emp-7', label: 'Position Light — CHECK' },
      { id: 'emp-8', label: 'Right Side of Fuselage — CHECK' },
    ],
  },
  {
    id: 'right-wing',
    title: '3. Exterior Preflight — Right Wing',
    items: [
        { id: 'rw-1', label: 'Flap — CHECK' },
        { id: 'rw-2', label: 'Aileron — CHECK' },
        { id: 'rw-3', label: 'Fuel Quantity — CHECK VISUALLY' },
        { id: 'rw-4', label: 'Fuel Filler Cap — SECURE' },
        { id: 'rw-5', label: 'Fuel Vent — CHECK' },
        { id: 'rw-6', label: 'Wing Tie-Down — REMOVE' },
        { id: 'rw-7', label: 'Main Wheel Tire — CHECK' },
        { id: 'rw-8', label: 'Brake Assembly — CHECK' },
        { id: 'rw-9', label: 'Fuel Sump — DRAIN' },
        { id: 'rw-10', label: 'Wing Leading Edge — CHECK' },
        { id: 'rw-11', label: 'Landing Light — CHECK' },
        { id: 'rw-12', label: 'Stall Warning Opening — CHECK CLEAR' },
    ]
  },
  {
    id: 'nose',
    title: '4. Exterior Preflight — Nose',
    items: [
        { id: 'nose-1', label: 'Engine Oil Level — CHECK' },
        { id: 'nose-2', label: 'Dipstick — SECURE' },
        { id: 'nose-3', label: 'Engine Cooling Inlets — CHECK' },
        { id: 'nose-4', label: 'Propeller and Spinner — CHECK' },
        { id: 'nose-5', label: 'Air Filter — CHECK' },
        { id: 'nose-6', label: 'Nose Wheel Strut — CHECK' },
        { id: 'nose-7', label: 'Tire — CHECK' },
        { id: 'nose-8', label: 'Tow Bar — REMOVE' },
    ]
  },
  {
    id: 'left-wing',
    title: '5. Exterior Preflight — Left Wing',
    items: [
        { id: 'lw-1', label: 'Fuel Sump — DRAIN' },
        { id: 'lw-2', label: 'Main Wheel Tire — CHECK' },
        { id: 'lw-3', label: 'Brake Assembly — CHECK' },
        { id: 'lw-4', label: 'Wing Tie-Down — REMOVE' },
        { id: 'lw-5', label: 'Fuel Quantity — CHECK VISUALLY' },
        { id: 'lw-6', label: 'Fuel Filler Cap — SECURE' },
        { id: 'lw-7', label: 'Wing Leading Edge — CHECK' },
        { id: 'lw-8', label: 'Pitot Tube — CHECK CLEAR' },
        { id: 'lw-9', label: 'Static Source — CHECK' },
        { id: 'lw-10', label: 'Aileron — CHECK' },
        { id: 'lw-11', label: 'Flap — CHECK' },
    ]
  }
];
