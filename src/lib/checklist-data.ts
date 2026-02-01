export type ChecklistItem = {
  n: number;
  text: string;
};

export type ChecklistEntry = {
    key: string;
    value: string;
}

export type ChecklistSection = {
  id: string;
  title: string;
  notes?: string[];
  items?: ChecklistItem[];
  entries?: ChecklistEntry[];
  type?: 'reference_table' | 'reference_note';
  text?: string;
};

export type Checklist = {
  id: string;
  title: string;
  sections: ChecklistSection[];
}

const CHECKLIST_DATA = {
  "schemaVersion": "1.0",
  "aircraft": {
    "make": "Cessna",
    "model": "182T"
  },
  "source": {
    "title": "Cessna 182T CHECKLIST (Leading Edge Aviation)",
    "revisionNumber": "2",
    "revisionDate": "2012-11-06",
    "notes": [
      "FOR TRAINING PURPOSES ONLY",
      "This is an abbreviated checklist. Most explanatory items, notes cautions and warnings have been omitted for brevity.",
      "Procedures in red/bold in this checklist should be committed to memory.",
      "All performance speeds should be computed prior to flight using the Aircraft Owner’s Manual.",
      "Users must be familiar with and operate in accordance with the official Aircraft Owner’s Manual."
    ]
  },
  "content": {
    "checklists": [
      {
        "id": "preflight",
        "title": "Cessna 182T Preflight Checklist",
        "sections": [
          {
            "id": "preflight_cabin",
            "title": "Cabin Preflight Inspection",
            "notes": ["REMOVE GUST LOCKS & PITOT COVER IF INSTALLED"],
            "items": [
              { "n": 1, "text": "Fuel Quantities — CHECK" },
              { "n": 2, "text": "Inspections — CHECK DATES and TIMES" },
              { "n": 3, "text": "Weight and CG — WITHIN LIMITS" },
              { "n": 4, "text": "Documents — CHECK" },
              { "n": 5, "text": "Control Wheel Lock — REMOVE" },
              { "n": 6, "text": "Ignition Switch — OFF" },
              { "n": 7, "text": "Avionics Switch — OFF" },
              { "n": 8, "text": "Master Switch — ON" },
              { "n": 9, "text": "Avionics Switch — ON" },
              { "n": 10, "text": "Avionics Cooling Fan — CHECK ON" },
              { "n": 11, "text": "Avionics Switch — OFF" },
              { "n": 12, "text": "Fuel Quantity Indicators — CHECK" },
              { "n": 13, "text": "Flaps — EXTEND" },
              { "n": 14, "text": "Interior and Exterior Lights — CHECK" },
              { "n": 15, "text": "Pitot Heat — CHECK THEN OFF" },
              { "n": 16, "text": "Stall Warning Vane — CHECK" },
              { "n": 17, "text": "Master Switch — OFF" },
              { "n": 18, "text": "Cowl Flaps — OPEN" },
              { "n": 19, "text": "Fuel Selector Valve — BOTH" },
              { "n": 20, "text": "Fire Extinguisher — CHECK CHARGE" }
            ]
          },
          {
            "id": "preflight_exterior_empennage",
            "title": "EXTERIOR PREFLIGHT INSPECTION — Empennage",
            "items": [
              { "n": 1, "text": "Antennas — CHECK" },
              { "n": 2, "text": "Baggage Door — LOCKED" },
              { "n": 3, "text": "Left Side of Fuselage — CHECK" },
              { "n": 4, "text": "Control Surfaces — CHECK" },
              { "n": 5, "text": "Tail Tie-down — REMOVE" },
              { "n": 6, "text": "Position Light — CHECK" },
              { "n": 7, "text": "Right Side of Fuselage — CHECK" }
            ]
          },
          {
            "id": "preflight_exterior_right_wing",
            "title": "EXTERIOR PREFLIGHT INSPECTION — Right Wing",
            "items": [
              { "n": 1, "text": "Flap and Aileron — CHECK" },
              { "n": 2, "text": "Position Light — CHECK" },
              { "n": 3, "text": "Strobe — CHECK" },
              { "n": 4, "text": "Wing — CHECK" },
              { "n": 5, "text": "Fuel Tank Vent — CHECK for BLOCKAGE" },
              { "n": 6, "text": "Wing Tie-down — REMOVE" },
              { "n": 7, "text": "Wing Root Vents — CHECK" },
              { "n": 8, "text": "Wheel Assembly — CHECK" },
              { "n": 9, "text": "Fuel Tank Sumps — (5) DRAIN and CHECK" },
              { "n": 10, "text": "Fuel Quantity — CHECK / CAP SECURE" }
            ]
          },
          {
            "id": "preflight_exterior_nose",
            "title": "EXTERIOR PREFLIGHT INSPECTION — Nose",
            "items": [
              { "n": 1, "text": "Right Side Static Port — CHECK" },
              { "n": 2, "text": "Fuel Sumps — (3) DRAIN and CHECK" },
              { "n": 3, "text": "Cowling, Propeller and Spinner — CHECK" },
              { "n": 4, "text": "Air Inlets — CLEAR" },
              { "n": 5, "text": "Air Filter — CHECK" },
              { "n": 6, "text": "Nose Wheel Assembly — CHECK" },
              { "n": 7, "text": "Oil Quantity — (5-9 quarts) CHECK" },
              { "n": 8, "text": "Left Side Static Port — CHECK" },
              { "n": 9, "text": "Windshield — CLEAN and CHECK" }
            ]
          },
          {
            "id": "preflight_exterior_left_wing",
            "title": "EXTERIOR PREFLIGHT INSPECTION — Left Wing",
            "items": [
              { "n": 1, "text": "Fuel Tank Sumps — (5) DRAIN and CHECK" },
              { "n": 2, "text": "Fuel Quantity — CHECK / CAP SECURE" },
              { "n": 3, "text": "Wing Root Vents — CHECK" },
              { "n": 4, "text": "Pitot Tube — CHECK" },
              { "n": 5, "text": "Stall Warning Opening — CHECK for BLOCKAGE" },
              { "n": 6, "text": "Wing Tie-down — REMOVE" },
              { "n": 7, "text": "Fuel Tank Vent — CHECK for BLOCKAGE" },
              { "n": 8, "text": "Wing — CHECK" },
              { "n": 9, "text": "Position Light — CHECK" },
              { "n": 10, "text": "Strobe — CHECK" },
              { "n": 11, "text": "Flap and Aileron — CHECK" },
              { "n": 12, "text": "Wheel Assembly — CHECK" }
            ]
          }
        ]
      },
      {
        "id": "normal_ops",
        "title": "Normal Procedures",
        "sections": [
          {
            "id": "before_starting_engine",
            "title": "Before Starting Engine",
            "items": [
              { "n": 1, "text": "Preflight Inspection — COMPLETE" },
              { "n": 2, "text": "Passenger Briefing — COMPLETE" },
              { "n": 3, "text": "Seat Belts/ Shoulder Harness — ADJUSTED/ SECURE" },
              { "n": 4, "text": "Fuel Selector Valve — BOTH" },
              { "n": 5, "text": "Cowl Flaps — OPEN" },
              { "n": 6, "text": "Circuit Breakers — CHECK IN" },
              { "n": 7, "text": "Avionics Master Switch — OFF" },
              { "n": 8, "text": "Brakes — TEST and SET" }
            ]
          },
          {
            "id": "v_speeds",
            "title": "V Speeds",
            "type": "reference_table",
            "entries": [
              { "key": "Vso", "value": "41 KIAS" },
              { "key": "Vs", "value": "51 KIAS" },
              { "key": "Vr", "value": "50-60 KIAS" },
              { "key": "Vx_sea_level", "value": "65 KIAS" },
              { "key": "Vx_10000", "value": "68 KIAS" },
              { "key": "Vy_sea_level", "value": "82 KIAS" },
              { "key": "Vy_10000", "value": "77 KIAS" },
              { "key": "Vfe_10", "value": "140 KIAS" },
              { "key": "Vfe_20", "value": "120 KIAS" },
              { "key": "Vfe_full", "value": "100 KIAS" },
              { "key": "Va_3100_lbs", "value": "110 KIAS" },
              { "key": "Va_2600_lbs", "value": "101 KIAS" },
              { "key": "Va_2100_lbs", "value": "91 KIAS" },
              { "key": "Vno", "value": "140 KIAS" },
              { "key": "Vne", "value": "175 KIAS" }
            ]
          },
          {
            "id": "starting_engine",
            "title": "Starting Engine",
            "notes": [
              "Do not crank more than 10 seconds / Allow 20 seconds to cool",
              "Refer to POH if engine does not start after 3 attempts"
            ],
            "items": [
              { "n": 1, "text": "Mixture — IDLE CUT-OFF" },
              { "n": 2, "text": "Propeller — HIGH RPM" },
              { "n": 3, "text": "Throttle — OPEN ¼ to ½ INCH" },
              { "n": 4, "text": "Beacon — ON" },
              { "n": 5, "text": "Battery Switch — ON" },
              { "n": 6, "text": "Aux. Fuel Pump — ON" },
              { "n": 7, "text": "Mixture — FULL RICH UNTIL FUEL FLOW RISES" },
              { "n": 8, "text": "Mixture — IDLE CUT-OFF" },
              { "n": 9, "text": "Aux. Fuel Pump — OFF" },
              { "n": 10, "text": "Propeller Area — CLEAR" },
              { "n": 11, "text": "Ignition — ENGAGE" },
              { "n": 12, "text": "Mixture — WHEN ENGINE STARTS FULL RICH" },
              { "n": 13, "text": "Throttle — 1000 RPM" },
              { "n": 14, "text": "Oil Pressure — INDICATING GREEN" },
              { "n": 15, "text": "Mixture — LEAN for TAXI" },
              { "n": 16, "text": "Alternator — ON" },
              { "n": 17, "text": "Ammeter — CHECK" },
              { "n": 18, "text": "Flaps — RETRACT" },
              { "n": 19, "text": "Navigation Lights — AS REQUIRED" },
              { "n": 20, "text": "Avionics Master Switch — ON" },
              { "n": 21, "text": "Transponder — STANDBY/1200" },
              { "n": 22, "text": "Heading Indicator — CHECK SLAVE/FREE" },
              { "n": 23, "text": "ASOS/ATIS — OBTAIN" },
              { "n": 24, "text": "Altimeter — SET" },
              { "n": 25, "text": "Advisory/Departure & Taxi Clearance — CONTACT" }
            ]
          },
          {
            "id": "taxi",
            "title": "Taxi",
            "items": [
              { "n": 1, "text": "Brakes — CHECK" },
              { "n": 2, "text": "Instrument Cross-Check — CHECK" }
            ]
          },
          {
            "id": "before_takeoff",
            "title": "Before Takeoff",
            "items": [
              { "n": 1, "text": "Nose Wheel — STRAIGHT" },
              { "n": 2, "text": "Brakes — SET and HOLD" },
              { "n": 3, "text": "Flight Controls — FREE and CORRECT" },
              { "n": 4, "text": "Mixture — RICH" },
              { "n": 5, "text": "Throttle — 1800 RPM" },
              { "n": 6, "text": "Mixture — SET for DENSITY ALTITUDE" },
              { "n": 7, "text": "Magnetos — (125 max drop, 50 diff.) CHECK" },
              { "n": 8, "text": "Propeller — CYCLE then HIGH RPM" },
              { "n": 9, "text": "Engine Gauges and Ammeter — CHECK" },
              { "n": 10, "text": "Vacuum — GREEN ARC" },
              { "n": 11, "text": "Annunciator Panel — CHECK" },
              { "n": 12, "text": "Throttle — CHECK IDLE" },
              { "n": 13, "text": "Throttle — 1000 RPM" },
              { "n": 14, "text": "Throttle Friction Lock — ADJUST" },
              { "n": 15, "text": "Communication/Navigation Radios — SET" },
              { "n": 16, "text": "NAV/GPS Switch — SET" },
              { "n": 17, "text": "Flight Instruments — SET and CHECKED" },
              { "n": 18, "text": "Fuel Quantities — CHECKED" },
              { "n": 19, "text": "Trim — TEST/SET for TAKEOFF" },
              { "n": 20, "text": "Autopilot — TEST/OFF" },
              { "n": 21, "text": "Flaps — SET for TAKEOFF" },
              { "n": 22, "text": "Cabin Doors & Windows — CLOSED and LATCHED" },
              { "n": 23, "text": "Seats — ADJUSTED/ LOCKED" },
              { "n": 24, "text": "Departure Briefing — CLEARANCE / EMERG. PLAN" },
              { "n": 25, "text": "Advisory/ Tower — CONTACT" }
            ]
          },
          {
            "id": "cleared_for_takeoff",
            "title": "Cleared For Takeoff",
            "items": [
              { "n": 1, "text": "Cowl Flaps — OPEN" },
              { "n": 2, "text": "Lights — AS REQUIRED" },
              { "n": 3, "text": "Transponder — ALTIDUDE" },
              { "n": 4, "text": "Brakes — RELEASE" },
              { "n": 5, "text": "Traffic — CHECK" }
            ]
          },
          {
            "id": "normal_takeoff",
            "title": "Normal Takeoff",
            "items": [
              { "n": 1, "text": "Wing Flaps — 0°-20°" },
              { "n": 2, "text": "Throttle — FULL OPEN" },
              { "n": 3, "text": "Elevator Control — LIFT NOSE AT 60 KIAS" },
              { "n": 4, "text": "Climb Speed — 70-80 KIAS" },
              { "n": 5, "text": "Wing Flaps — RETRACT IF APPLICABLE" }
            ]
          },
          {
            "id": "short_field_takeoff",
            "title": "Short Field Takeoff",
            "items": [
              { "n": 1, "text": "Wing Flaps — 20°" },
              { "n": 2, "text": "Brakes — HOLD" },
              { "n": 3, "text": "Throttle — FULL OPEN" },
              { "n": 4, "text": "Engine Gauges — GREEN" },
              { "n": 5, "text": "Brakes — RELEASE" },
              { "n": 6, "text": "Elevator Control — SLIGHTLY TAIL LOW" },
              { "n": 7, "text": "Obstacle Clearance Speed — 60 KIAS" },
              { "n": 8, "text": "Airspeed — ACCELERATE FOR NORMAL CLIMB" },
              { "n": 9, "text": "Wing Flaps — RETRACT" }
            ]
          },
          {
            "id": "soft_field_takeoff",
            "title": "Soft Field Takeoff",
            "items": [
              { "n": 1, "text": "Wing Flaps — 10°-20°" },
              { "n": 2, "text": "Elevator Control — TAIL LOW" },
              { "n": 3, "text": "Throttle — FULL OPEN" },
              { "n": 4, "text": "Accelerate — WHILE IN GROUND EFFECT" },
              { "n": 5, "text": "Climb Speed — 67 KIAS" },
              { "n": 6, "text": "Wing Flaps — RETRACT" }
            ]
          },
          {
            "id": "enroute_climb",
            "title": "Enroute Climb",
            "items": [
              { "n": 1, "text": "Airspeed — 85-95 KIAS" },
              { "n": 2, "text": "Throttle — AS REQUIRED" },
              { "n": 3, "text": "Propeller — AS REQUIRED" },
              { "n": 4, "text": "Mixture — AS REQUIRED" },
              { "n": 5, "text": "Cowl Flaps — AS REQUIRED FOR ENGINE TEMP" }
            ]
          },
          {
            "id": "cruise",
            "title": "Cruise",
            "items": [
              { "n": 1, "text": "Power — SET for CRUISE" },
              { "n": 2, "text": "Trim — AS REQUIRED" },
              { "n": 3, "text": "Mixture — LEAN for CRUISE" },
              { "n": 4, "text": "Landing Light — AS REQUIRED" },
              { "n": 5, "text": "Heading Indicator — CROSS-CHECK" }
            ]
          },
          {
            "id": "descent",
            "title": "Descent",
            "items": [
              { "n": 1, "text": "ASOS/ATIS — OBTAIN" },
              { "n": 2, "text": "Altimeter — SET" },
              { "n": 3, "text": "Arrival/Passenger Briefing — COMPLETE" },
              { "n": 4, "text": "Mixture — ADJUST AS REQUIRED" },
              { "n": 5, "text": "Power — AS REQUIRED" },
              { "n": 6, "text": "Landing Light — ON" },
              { "n": 7, "text": "Wing Flaps — AS REQUIRED" },
              { "n": 8, "text": "Cowl Flaps — AS REQUIRED FOR ENGINE TEMP" },
              { "n": 9, "text": "Fuel Selector Valve — BOTH" }
            ]
          },
          {
            "id": "before_landing",
            "title": "Before Landing",
            "items": [
              { "n": 1, "text": "Seats, Belts and Shoulder Harnesses — ADJUST/LOCKED" },
              { "n": 2, "text": "Propeller — HIGH RPM" },
              { "n": 3, "text": "Mixture — AS REQUIRED" },
              { "n": 4, "text": "Autopilot — OFF" }
            ]
          },
          {
            "id": "normal_landing",
            "title": "Normal Landing",
            "items": [
              { "n": 1, "text": "Power — AS REQUIRED" },
              { "n": 2, "text": "Airspeed — (flaps UP) 70-80 KIAS" },
              { "n": 3, "text": "Wing Flaps — AS REQUIRED" },
              { "n": 4, "text": "Airspeed — (flaps DOWN) 65 KIAS" },
              { "n": 5, "text": "Touchdown — MAIN WHEELS FIRST" },
              { "n": 6, "text": "Brakes — APPLY AS NECESSARY" }
            ]
          },
          {
            "id": "short_field_landing",
            "title": "Short Field Landing",
            "items": [
              { "n": 1, "text": "Power — AS REQUIRED" },
              { "n": 2, "text": "Wing Flaps — FULL" },
              { "n": 3, "text": "Airspeed — 60 KIAS" },
              { "n": 4, "text": "Touchdown — MAIN WHEELS FIRST" },
              { "n": 5, "text": "Wing Flaps — RETRACT" },
              { "n": 6, "text": "Brakes — APPLY AS NECCESARY" }
            ]
          },
          {
            "id": "soft_field_landing",
            "title": "Soft Field Landing",
            "items": [
              { "n": 1, "text": "Power — AS REQUIRED" },
              { "n": 2, "text": "Wing Flaps — FULL" },
              { "n": 3, "text": "Airspeed — 65 KIAS" },
              { "n": 4, "text": "Touchdown — MAIN WHEELS FIRST" },
              { "n": 5, "text": "Landing Roll — TAIL LOW" }
            ]
          },
          {
            "id": "go_around",
            "title": "Go Around (Balked Landing)",
            "items": [
              { "n": 1, "text": "Throttle — FULL OPEN" },
              { "n": 2, "text": "Wing Flaps — RETRACT TO 20°" },
              { "n": 3, "text": "Climb Speed — 55 KIAS" },
              { "n": 4, "text": "Cowl Flaps — OPEN" },
              { "n": 5, "text": "Wing Flaps — 10°" },
              { "n": 6, "text": "Wing Flaps — (after clearing obstacles) RETRACT" }
            ]
          },
          {
            "id": "after_landing",
            "title": "AFTER LANDING / CLEAR OF RUNWAY",
            "items": [
              { "n": 1, "text": "Wing Flaps — UP" },
              { "n": 2, "text": "Mixture — LEAN for TAXI" },
              { "n": 3, "text": "Cowl Flaps — OPEN" },
              { "n": 4, "text": "Landing Light — OFF" },
              { "n": 5, "text": "Strobes — OFF" },
              { "n": 6, "text": "Transponder — STANDBY" },
              { "n": 7, "text": "Taxi Clearance / Advisory — CONTACT" }
            ]
          },
          {
            "id": "securing_airplane",
            "title": "Securing Airplane",
            "items": [
              { "n": 1, "text": "Avionics Master Switch — OFF" },
              { "n": 2, "text": "Throttle — IDLE" },
              { "n": 3, "text": "Magnetos — CHECK GROUNDING" },
              { "n": 4, "text": "Throttle — 1000 RPM" },
              { "n": 5, "text": "Mixture — IDLE CUT-OFF" },
              { "n": 6, "text": "Ignition — OFF" },
              { "n": 7, "text": "Master Switch — OFF" },
              { "n": 8, "text": "Beacon — OFF" },
              { "n": 9, "text": "Fuel Selector — LEFT/RIGHT" },
              { "n": 10, "text": "Control Lock — INSTALL" },
              { "n": 11, "text": "Flight Information — RECORD" },
              { "n": 12, "text": "Pitot Tube Cover — INSTALL" },
              { "n": 13, "text": "Wheel Chocks & Tie Downs — SECURE" },
              { "n": 14, "text": "Post Flight Walk-Around — COMPLETE" },
              { "n": 15, "text": "Doors — LOCKED" }
            ]
          }
        ]
      },
      {
        "id": "abnormal",
        "title": "ABNORMAL PROCEDURES",
        "sections": [
          {
            "id": "flooded_start",
            "title": "Flooded Start",
            "items": [
              { "n": 1, "text": "Mixture — IDLE CUT-OFF" },
              { "n": 2, "text": "Throttle — FULL OPEN" },
              { "n": 3, "text": "Beacon — ON" },
              { "n": 4, "text": "Battery Switch — ON" },
              { "n": 5, "text": "Aux. Fuel Pump — OFF" },
              { "n": 6, "text": "Proceed with Item 10 from “Starting Engine” checklist" }
            ]
          },
          {
            "id": "ammeter_excessive_charge",
            "title": "Ammeter Shows Excessive Rate Of Charge",
            "items": [
              { "n": 1, "text": "Alternator — OFF" },
              { "n": 2, "text": "Nonessential Electrical Equipment — OFF" },
              { "n": 3, "text": "Flight — LAND AS SOON AS PRACTICAL" }
            ]
          },
          {
            "id": "low_voltage_in_flight",
            "title": "Low Voltage Annunciator (Volts) Illuminates In Flight",
            "items": [
              { "n": 1, "text": "Avionics Master Switch — OFF" },
              { "n": 2, "text": "Alternator Circuit Breaker — CHECK IN" },
              { "n": 3, "text": "Master Switch (Both Sides) — OFF then ON" },
              { "n": 4, "text": "Low Voltage Light — CHECK OFF" },
              { "n": 5, "text": "Avionics Master Switch — ON" },
              { "n": 6, "text": "If Low Voltage Annunciator Illuminates Again:" },
              { "n": 7, "text": "Alternator — OFF" },
              { "n": 8, "text": "Nonessential Electrical Equipment — OFF" },
              { "n": 9, "text": "Flight — TERMINATE" }
            ]
          }
        ]
      },
      {
        "id": "landing_abnormal",
        "title": "Landing Abnormal Procedures",
        "sections": [
          {
            "id": "landing_flat_main_tire",
            "title": "Landing With A Flat Main Tire",
            "items": [
              { "n": 1, "text": "Flaps — AS REQUIRED" },
              { "n": 2, "text": "Approach — NORMAL" },
              { "n": 3, "text": "Touchdown — GOOD TIRE FIRST" },
              { "n": 4, "text": "Directional Control — MAINTAIN (Using brake on good tire)" }
            ]
          },
          {
            "id": "landing_flat_nose_tire",
            "title": "Landing With a Flat Nose Tire",
            "notes": ["Maintain full aft elevator deflection during ground roll"],
            "items": [
              { "n": 1, "text": "Approach — NORMAL" },
              { "n": 2, "text": "Flaps — AS REQUIRED" },
              { "n": 3, "text": "Touchdown — ON MAINS" },
              { "n": 4, "text": "Elevator — AS NECESSARY TO DELAY NOSE GEAR CONTACT" }
            ]
          }
        ]
      },
      {
        "id": "emergency",
        "title": "EMERGENCY CHECKLIST",
        "notes": [
          "This is an operational checklist. Procedures in the outlined portions of this section should be committed to memory.",
          "The official aircraft ARM/AFM contains additional procedures and expanded procedures not listed here."
        ],
        "sections": [
          {
            "id": "emergency_airspeeds",
            "title": "Airspeeds For Emergency Operation",
            "type": "reference_table",
            "entries": [
              { "key": "engine_failure_after_takeoff_flaps_down", "value": "70 KIAS" },
              { "key": "max_glide_3100_lbs", "value": "76 KIAS" },
              { "key": "max_glide_2600_lbs", "value": "70 KIAS" },
              { "key": "max_glide_2100_lbs", "value": "63 KIAS" },
              { "key": "landing_without_engine_power_flaps_up", "value": "75 KIAS" },
              { "key": "landing_without_engine_power_flaps_down", "value": "70 KIAS" }
            ]
          },
          {
            "id": "engine_failure_immediately_after_takeoff",
            "title": "Engine Failure Immediately After Takeoff",
            "items": [
              { "n": 1, "text": "Airspeed — (Flaps UP) 75 KIAS / (Flaps DOWN) 70 KIAS" },
              { "n": 2, "text": "Mixture — IDLE CUT-OFF" },
              { "n": 3, "text": "Fuel Selector Valve — OFF" },
              { "n": 4, "text": "Ignition Switch — OFF" },
              { "n": 5, "text": "Flaps — AS REQUIRED" },
              { "n": 6, "text": "Master Switch — OFF" },
              { "n": 7, "text": "Cabin Door — UNLATCH" },
              { "n": 8, "text": "Land — STRAIGHT AHEAD" }
            ]
          },
          {
            "id": "engine_failure_power_loss_during_flight",
            "title": "Engine Failure / Power Loss During Flight",
            "items": [
              { "n": 1, "text": "Airspeed — BEST GLIDE" },
              { "n": 2, "text": "Fuel Selector Valve — BOTH" },
              { "n": 3, "text": "Aux Fuel Pump — ON" },
              { "n": 4, "text": "Mixture — RICH" },
              { "n": 5, "text": "Magnetos — CHECK BOTH" },
              { "n": 6, "text": "If Power Is Restored:" },
              { "n": 7, "text": "Aux Fuel Pump — OFF" },
              { "n": 8, "text": "Fuel Flow — MONITOR" }
            ]
          },
          {
            "id": "emergency_landing_without_engine_power",
            "title": "Emergency Landing Without Engine Power",
            "items": [
              { "n": 1, "text": "Airspeed — BEST GLIDE" },
              { "n": 2, "text": "Landing Site — DETERMINE" },
              { "n": 3, "text": "Seats, Seatbelts, Shoulder Harnesses — SECURE" },
              { "n": 4, "text": "Mixture — IDLE CUT-OFF" },
              { "n": 5, "text": "Fuel Selector Valve — OFF" },
              { "n": 6, "text": "Ignition Switch — OFF" },
              { "n": 7, "text": "Flaps — AS REQUIRED (FULL Recommended)" },
              { "n": 8, "text": "Master Switch — OFF" },
              { "n": 9, "text": "Doors — UNLATCH" },
              { "n": 10, "text": "Touchdown — SLIGHTLY TAIL LOW" },
              { "n": 11, "text": "Brakes — APPLY AS NECESSARY" }
            ]
          },
          {
            "id": "precautionary_landing_with_engine_power",
            "title": "Precautionary Landing With Engine Power",
            "items": [
              { "n": 1, "text": "Seats, Seatbelts, Shoulder Harness — SECURE" },
              { "n": 2, "text": "Airspeed — 75 KIAS" },
              { "n": 3, "text": "Wing Flaps — 20°" },
              { "n": 4, "text": "Selected Field — FLY OVER" },
              { "n": 5, "text": "Avionics Master Switch — OFF" },
              { "n": 6, "text": "Flaps — AS REQUIRED (FULL Recommended)" },
              { "n": 7, "text": "Airspeed — 70 KIAS" },
              { "n": 8, "text": "Master Switch — OFF" },
              { "n": 9, "text": "Doors — UNLATCH" },
              { "n": 10, "text": "Touchdown — SLIGHTLY TAIL LOW" },
              { "n": 11, "text": "Ignition Switch — OFF" },
              { "n": 12, "text": "Brakes — APPLY AS NECESSARY" }
            ]
          },
          {
            "id": "fire_during_engine_start",
            "title": "Fire During Engine Start",
            "items": [
              { "n": 1, "text": "Cranking — CONTINUE" },
              { "n": 2, "text": "If Engine Starts:" },
              { "n": 3, "text": "Power — 1700 RPM" },
              { "n": 4, "text": "Engine — SHUTDOWN" },
              { "n": 5, "text": "If Engine Fails to Start:" },
              { "n": 6, "text": "Throttle — FULL OPEN" },
              { "n": 7, "text": "Mixture — IDLE CUT-OFF" },
              { "n": 8, "text": "Cranking — CONTINUE" },
              { "n": 9, "text": "Fuel Selector Valve — OFF" },
              { "n": 10, "text": "Aux Fuel Pump — OFF" },
              { "n": 11, "text": "Master Switch — OFF" },
              { "n": 12, "text": "Ignition Switch — OFF" },
              { "n": 13, "text": "Fire Extinguisher — OBTAIN" }
            ]
          },
          {
            "id": "engine_fire_in_flight",
            "title": "Engine Fire In Flight",
            "notes": ["Refer to “Emergency Landing Without Engine Power” checklist if time permits"],
            "items": [
              { "n": 1, "text": "Mixture — IDLE CUT-OFF" },
              { "n": 2, "text": "Fuel Selector Valve — OFF" },
              { "n": 3, "text": "Aux Fuel Pump — OFF" },
              { "n": 4, "text": "Master Switch — OFF" },
              { "n": 5, "text": "Cabin Heat and Air — CLOSED" },
              { "n": 6, "text": "Wing Root Vents — OPEN" },
              { "n": 7, "text": "Airspeed — 100+ KIAS" },
              { "n": 8, "text": "Forced Landing — EXECUTE" }
            ]
          },
          {
            "id": "electrical_fire_in_flight",
            "title": "Electrical Fire In Flight",
            "items": [
              { "n": 1, "text": "Master Switch — OFF" },
              { "n": 2, "text": "Vents, Cabin Heat and Air — CLOSED" },
              { "n": 3, "text": "Fire Extinguisher — ACTIVATE" },
              { "n": 4, "text": "Avionics Master Switch — OFF" },
              { "n": 5, "text": "All Electrical Switches (except ignition) — OFF" },
              { "n": 6, "text": "If Fire Appears Out:" },
              { "n": 7, "text": "Vents/Cabin Air/Heat — OPEN" },
              { "n": 8, "text": "Master Switch — ON" },
              { "n": 9, "text": "Circuit Breakers — CHECK (do not reset)" },
              { "n": 10, "text": "Radio Switches — OFF" },
              { "n": 11, "text": "Avionics Master Switch — ON" },
              { "n": 12, "text": "Radio and Electrical Switches — (one at a time) ON" }
            ]
          },
          {
            "id": "cabin_fire",
            "title": "Cabin Fire",
            "notes": ["Refer to “Emergency Landing Without Engine Power” checklist if time permits"],
            "items": [
              { "n": 1, "text": "Master Switch — OFF" },
              { "n": 2, "text": "Vents, Cabin Heat and Air — CLOSED" },
              { "n": 3, "text": "Fire Extinguisher (if available) — ACTIVATE" },
              { "n": 4, "text": "Forced Landing — EXECUTE" }
            ]
          },
          {
            "id": "wing_fire",
            "title": "Wing Fire",
            "notes": [
              "Perform a side slip to keep the flames away from the fuel tank and cabin, and land as soon as possible with flaps retracted."
            ],
            "items": [
              { "n": 1, "text": "Landing/Taxi Light Switch — OFF" },
              { "n": 2, "text": "Navigation Light Switch — OFF" },
              { "n": 3, "text": "Strobe Light Switch — OFF" },
              { "n": 4, "text": "Pitot Heat Switch — OFF" }
            ]
          },
          {
            "id": "contact_note",
            "title": "Operator Note",
            "type": "reference_note",
            "text": "Should any mechanical difficulty, accident, incident or delay occur, please contact a Leading Edge Aviation representative before continuing any flight. DO NOT FLY any aircraft that may have been damaged, until it has been inspected and certified airworthy by a certified mechanic. Call Leading Edge Aviation 435-752-5955."
          }
        ]
      },
      {
        "id": "briefing",
        "title": "Passenger/Crew Briefing Checklist",
        "sections": [
          {
            "id": "briefing_before_engine_start",
            "title": "Before Engine Start",
            "items": [
              { "n": 1, "text": "Normal and emergency exit procedures" },
              { "n": 2, "text": "Seatbelt operations" },
              { "n": 3, "text": "Fire extinguisher location & operations" },
              { "n": 4, "text": "Identify PIC for the flight" },
              { "n": 5, "text": "Positive exchange of flight controls process" }
            ]
          },
          {
            "id": "briefing_before_takeoff",
            "title": "Before Take-Off",
            "items": [
              { "n": 1, "text": "Verify runway in use" },
              { "n": 2, "text": "Type of take-off" },
              { "n": 3, "text": "Direction of departure (VFR)" },
              { "n": 4, "text": "Departure clearance (IFR)" },
              { "n": 5, "text": "Emergency plan" },
              { "n": "5a", "text": "Emergency on runway" },
              { "n": "5b", "text": "Emergency after liftoff" },
              { "n": "5c", "text": "Emergency at altitude" },
              { "n": "5d", "text": "Flying/non-flying pilot roles during emergency operations" }
            ]
          },
          {
            "id": "briefing_approach",
            "title": "Approach",
            "items": [
              { "n": 1, "text": "Verify runway in use" },
              { "n": 2, "text": "Type of landing" },
              { "n": 3, "text": "Expected crosswind direction/intensity" },
              { "n": 4, "text": "Traffic pattern (VFR)" },
              { "n": 5, "text": "Instrument approach briefing (IFR)" }
            ]
          },
          {
            "id": "briefing_emergency_codes",
            "title": "Emergency Transponder Codes",
            "type": "reference_table",
            "entries": [
              { "key": "Air Piracy", "value": "7500" },
              { "key": "Lost Communication", "value": "7600" },
              { "key": "General Emergency", "value": "7700" }
            ]
          },
          {
            "id": "briefing_guard_frequency",
            "title": "Emergency 2-Way Communication Frequency",
            "type": "reference_table",
            "entries": [
              { "key": "Guard Frequency", "value": "121.5" }
            ]
          }
        ]
      }
    ]
  }
};

export const ALL_CHECKLISTS: Checklist[] = CHECKLIST_DATA.content.checklists;

export const SOURCE_NOTES: string[] = CHECKLIST_DATA.source.notes;
