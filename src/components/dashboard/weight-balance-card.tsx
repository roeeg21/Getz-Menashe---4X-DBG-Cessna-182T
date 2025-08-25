
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AIRCRAFT_SPECS, STATIONS, LIMITS, KG_TO_LB, GAL_TO_LB } from '@/lib/constants';
import { User, Fuel, Luggage, Save, FolderOpen, AlertCircle, Droplets } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Weights = {
  pilot: number;
  coPilot: number;
  rearSeats: number;
  fuel: number;
  baggageA: number;
  baggageB: number;
  baggageC: number;
};

export type WeightAndBalanceReport = {
  totalWeight: number;
  totalCg: number;
  landingWeight: number;
  landingCg: number;
  zeroFuelWeight: number;
  zeroFuelCg: number;
  weights: Weights;
  isWithinLimits: boolean;
  isLandingWeightOk: boolean;
};

type WeightBalanceCardProps = {
  onUpdate: (report: WeightAndBalanceReport) => void;
};

type Profile = {
  name: string;
  weights: Weights;
};

// This function now correctly reflects the sloped forward limit from the 2000 POH.
const isCgWithinEnvelope = (weight: number, cg: number): boolean => {
  if (weight < AIRCRAFT_SPECS.emptyWeight || weight > LIMITS.maxWeight) return false;

  const aftLimit = 47.0;
  if (cg > aftLimit) return false;

  let forwardLimit = 0;
  if (weight <= 2300) {
    forwardLimit = 35.0;
  } else if (weight > 2300 && weight <= 3100) {
    // Linear interpolation between (2300, 35.0) and (3100, 40.5)
    forwardLimit = 35.0 + ((weight - 2300) / (3100 - 2300)) * (40.5 - 35.0);
  } else {
    // This case handles weights above maxWeight, which should be caught by the first check.
    return false;
  }

  return cg >= forwardLimit;
};

const AircraftDiagram = ({ weights, unit }: { weights: Weights; unit: string }) => {
  const getDisplayValue = (lbs: number) => {
    const value = unit === 'kg' ? Math.round(lbs / KG_TO_LB) : lbs;
    return value > 0 ? `${value}${unit}` : '';
  };

  const fuelGal = Math.round(weights.fuel / GAL_TO_LB);
  const fuelDisplay = fuelGal > 0 ? `${fuelGal}gal` : '';

  const jsonSpec = {
      "style": { "stroke": "#000000", "stroke_width": 2, "fill": "#FFFFFF", "line_cap": "round", "line_join": "round" },
      "draw_order": [ "left_wing", "right_wing", "fuselage_main", "nose_spinner", "canopy", "left_wing_panel", "right_wing_panel", "left_flap_split", "left_aileron_split", "right_flap_split", "right_aileron_split", "left_wing_hatch", "fuel_cap_left", "fuel_cap_right", "hstab_left", "hstab_right", "elevator_hinge", "vstab", "rudder_hinge" ],
      "shapes": {
          "fuselage_main": { "type": "polygon", "points": [ [485, 80], [515, 80], [530, 220], [530, 640], [520, 880], [505, 930], [495, 930], [480, 880], [470, 640], [470, 220] ] },
          "nose_spinner": { "type": "polygon", "points": [[500, 40], [517, 80], [483, 80]] },
          "canopy": { "type": "ellipse", "center": [500, 300], "rx": 58, "ry": 46 },
          "left_wing": { "type": "polygon", "points": [ [470, 245], [135, 245], [75, 265], [135, 435], [470, 435] ] },
          "right_wing": { "type": "polygon", "points": [ [530, 245], [865, 245], [925, 265], [865, 435], [530, 435] ] },
          "left_wing_panel": { "type": "polyline", "points": [[135, 340], [470, 340]] },
          "right_wing_panel": { "type": "polyline", "points": [[530, 340], [865, 340]] },
          "left_flap_split":   { "type": "polyline", "points": [[330, 245], [330, 435]] },
          "left_aileron_split":{ "type": "polyline", "points": [[205, 245], [205, 435]] },
          "right_flap_split":  { "type": "polyline", "points": [[670, 245], [670, 435]] },
          "right_aileron_split":{ "type": "polyline", "points": [[795, 245], [795, 435]] },
          "left_wing_hatch": { "type": "rect", "x": 165, "y": 270, "width": 44, "height": 26 },
          "fuel_cap_left":  { "type": "circle", "center": [458, 320], "r": 10 },
          "fuel_cap_right": { "type": "circle", "center": [542, 320], "r": 10 },
          "hstab_left": { "type": "polygon", "points": [ [488, 720], [365, 720], [315, 752], [365, 785], [488, 785] ] },
          "hstab_right": { "type": "polygon", "points": [ [512, 720], [635, 720], [685, 752], [635, 785], [512, 785] ] },
          "elevator_hinge": { "type": "polyline", "points": [[365, 775], [488, 775], [512, 775], [635, 775]] },
          "vstab": { "type": "polygon", "points": [[487, 705], [513, 705], [513, 875], [500, 895], [487, 875]] },
          "rudder_hinge": { "type": "polyline", "points": [[500, 720], [500, 880]] }
      }
  };

  const renderShape = (name: string) => {
    const shape = (jsonSpec.shapes as any)[name];
    const { style } = jsonSpec;
    const commonProps = {
        stroke: style.stroke,
        strokeWidth: style.stroke_width,
        fill: shape.fill || style.fill,
        strokeLinecap: style.line_cap as "round",
        strokeLinejoin: style.line_join as "round",
    };

    switch (shape.type) {
        case 'polygon':
            return <polygon key={name} points={shape.points.map((p: number[]) => p.join(',')).join(' ')} {...commonProps} />;
        case 'polyline':
             return <polyline key={name} points={shape.points.map((p: number[]) => p.join(',')).join(' ')} {...commonProps} fill="none" />;
        case 'ellipse':
            return <ellipse key={name} cx={shape.center[0]} cy={shape.center[1]} rx={shape.rx} ry={shape.ry} {...commonProps} />;
        case 'circle':
            return <circle key={name} cx={shape.center[0]} cy={shape.center[1]} r={shape.r} {...commonProps} />;
        case 'rect':
            return <rect key={name} x={shape.x} y={shape.y} width={shape.width} height={shape.height} {...commonProps} />;
        default:
            return null;
    }
  };

  return (
    <div className="relative my-4 w-full max-w-sm mx-auto p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        aria-label="Cessna 182T Diagram"
        className="w-full h-auto"
      >
        <g>
          {jsonSpec.draw_order.map(shapeName => renderShape(shapeName))}
        </g>
      </svg>
      <div className="absolute inset-0 text-xs font-semibold text-foreground">
        {/* Positioning based on the new SVG coordinates (viewBox 1000x1000) */}
        {/* Pilot */}
        <div className="absolute top-[28%] left-[45%] -translate-x-1/2 -translate-y-1/2">{getDisplayValue(weights.pilot)}</div>
        {/* Co-pilot */}
        <div className="absolute top-[28%] left-[55%] -translate-x-1/2 -translate-y-1/2">{getDisplayValue(weights.coPilot)}</div>
        {/* Rear Seats */}
        <div className="absolute top-[43%] left-[50%] -translate-x-1/2 -translate-y-1/2">{getDisplayValue(weights.rearSeats)}</div>
        {/* Fuel */}
        <div className="absolute top-[34%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-blue-600">{fuelDisplay}</div>
        {/* Baggage A */}
        <div className="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2">{getDisplayValue(weights.baggageA)}</div>
        {/* Baggage B */}
        <div className="absolute top-[68%] left-[50%] -translate-x-1/2 -translate-y-1/2">{getDisplayValue(weights.baggageB)}</div>
         {/* Baggage C */}
        <div className="absolute top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2">{getDisplayValue(weights.baggageC)}</div>
      </div>
    </div>
  );
};


export default function WeightBalanceCard({ onUpdate }: WeightBalanceCardProps) {
  const [isKg, setIsKg] = useState(false);
  const [weights, setWeights] = useState<Weights>({ pilot: 0, coPilot: 0, rearSeats: 0, fuel: 0, baggageA: 0, baggageB: 0, baggageC: 0 });
  const [fuelGal, setFuelGal] = useState('');
  const [plannedFuelBurnGal, setPlannedFuelBurnGal] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileName, setProfileName] = useState('');
  const [isSaveOpen, setSaveOpen] = useState(false);
  const [isLoadOpen, setLoadOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedProfiles = localStorage.getItem('c182t-wb-profiles');
      if (savedProfiles) {
        setProfiles(JSON.parse(savedProfiles));
      }
    } catch (error) {
      console.error("Could not load profiles from localStorage", error);
    }
  }, []);

  const handleWeightChange = (name: keyof Weights, value: string) => {
    const numericValue = parseInt(value, 10) || 0;
    const valueInLbs = isKg ? Math.round(numericValue * KG_TO_LB) : numericValue;
    setWeights(prev => ({ ...prev, [name]: valueInLbs }));
  };
  
  const handleFuelChange = (value: string) => {
    setFuelGal(value);
    const numericValue = parseInt(value, 10) || 0;
    setWeights(prev => ({ ...prev, fuel: Math.round(numericValue * GAL_TO_LB) }));
  };
  
  const handleFuelBurnChange = (value: string) => {
    setPlannedFuelBurnGal(value);
  };

  const getDisplayValue = (lbs: number) => {
    const value = isKg ? Math.round(lbs / KG_TO_LB) : lbs;
    return value > 0 ? value.toString() : '';
  };

  const calculation = useMemo(() => {
    const pilotMoment = weights.pilot * STATIONS.pilot.arm;
    const coPilotMoment = weights.coPilot * STATIONS.coPilot.arm;
    const rearMoment = weights.rearSeats * STATIONS.rearSeats.arm;
    const fuelMoment = weights.fuel * STATIONS.fuel.arm;
    const baggageAMoment = weights.baggageA * STATIONS.baggageA.arm;
    const baggageBMoment = weights.baggageB * STATIONS.baggageB.arm;
    const baggageCMoment = weights.baggageC * STATIONS.baggageC.arm;

    const totalBaggageWeight = weights.baggageA + weights.baggageB + weights.baggageC;

    const totalPayloadWeight = weights.pilot + weights.coPilot + weights.rearSeats + weights.fuel + totalBaggageWeight;
    const totalWeight = AIRCRAFT_SPECS.emptyWeight + totalPayloadWeight;
    const totalMoment = AIRCRAFT_SPECS.emptyMoment + pilotMoment + coPilotMoment + rearMoment + fuelMoment + baggageAMoment + baggageBMoment + baggageCMoment;
    const totalCg = totalWeight > 0 ? totalMoment / totalWeight : AIRCRAFT_SPECS.emptyCg;

    const isWithinLimits = isCgWithinEnvelope(totalWeight, totalCg);

    // Landing Calculation
    const fuelBurnLbs = (parseInt(plannedFuelBurnGal, 10) || 0) * GAL_TO_LB;
    const fuelBurnMoment = fuelBurnLbs * STATIONS.fuel.arm;
    const landingWeight = totalWeight - fuelBurnLbs;
    const landingMoment = totalMoment - fuelBurnMoment;
    const landingCg = landingWeight > 0 ? landingMoment / landingWeight : 0;
    const isLandingWeightOk = landingWeight <= LIMITS.maxLandingWeight;

    // Zero Fuel Calculation
    const zeroFuelWeight = totalWeight - weights.fuel;
    const zeroFuelMoment = totalMoment - fuelMoment;
    const zeroFuelCg = zeroFuelWeight > 0 ? zeroFuelMoment / zeroFuelWeight : 0;


    return { 
        totalWeight, totalCg, isWithinLimits, totalBaggageWeight, landingWeight, landingCg, isLandingWeightOk, zeroFuelWeight, zeroFuelCg,
        moments: {
            pilot: pilotMoment,
            coPilot: coPilotMoment,
            rearSeats: rearMoment,
            fuel: fuelMoment,
            baggageA: baggageAMoment,
            baggageB: baggageBMoment,
            baggageC: baggageCMoment,
            total: totalMoment,
        }
    };
  }, [weights, plannedFuelBurnGal]);

  useEffect(() => {
    onUpdate({
      totalWeight: calculation.totalWeight,
      totalCg: calculation.totalCg,
      landingWeight: calculation.landingWeight,
      landingCg: calculation.landingCg,
      zeroFuelWeight: calculation.zeroFuelWeight,
      zeroFuelCg: calculation.zeroFuelCg,
      weights: weights,
      isWithinLimits: calculation.isWithinLimits,
      isLandingWeightOk: calculation.isLandingWeightOk,
    });
  }, [calculation, weights, onUpdate]);

  const saveProfile = () => {
    if (!profileName) {
      toast({ title: "Error", description: "Profile name cannot be empty.", variant: "destructive" });
      return;
    }
    const newProfile: Profile = { name: profileName, weights };
    const updatedProfiles = [...profiles.filter(p => p.name !== profileName), newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('c182t-wb-profiles', JSON.stringify(updatedProfiles));
    toast({ title: "Success", description: `Profile "${profileName}" saved.` });
    setProfileName('');
    setSaveOpen(false);
  };

  const loadProfile = (name: string) => {
    const profile = profiles.find(p => p.name === name);
    if (profile) {
      const loadedWeights = {
        pilot: 0,
        coPilot: 0,
        rearSeats: 0,
        fuel: 0,
        baggageA: 0,
        baggageB: 0,
        baggageC: 0,
        ...profile.weights
      };

      if ((profile.weights as any).frontSeats) {
        loadedWeights.pilot = (profile.weights as any).frontSeats;
        loadedWeights.coPilot = 0;
      }

      setWeights(loadedWeights);
      setFuelGal(Math.round(loadedWeights.fuel / GAL_TO_LB).toString());

      toast({ title: "Success", description: `Profile "${name}" loaded.` });
      setLoadOpen(false);
    }
  };

  const unitLabel = isKg ? 'kg' : 'lb';
  const isBaggageOverLimit = calculation.totalBaggageWeight > LIMITS.totalBaggageMax;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Weight &amp; Balance</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="unit-switch">KG</Label>
            <Switch id="unit-switch" checked={isKg} onCheckedChange={setIsKg} />
          </div>
        </div>
        <CardDescription>Enter weights for each station to calculate total weight and center of gravity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <AircraftDiagram weights={weights} unit={unitLabel} />

        {/* Inputs */}
        <div className="space-y-2">
            <WeightInput icon={User} label={STATIONS.pilot.label} value={getDisplayValue(weights.pilot)} onChange={e => handleWeightChange('pilot', e.target.value)} unit={unitLabel} />
            <WeightInput icon={User} label={STATIONS.coPilot.label} value={getDisplayValue(weights.coPilot)} onChange={e => handleWeightChange('coPilot', e.target.value)} unit={unitLabel} />
            <WeightInput icon={User} label={STATIONS.rearSeats.label} value={getDisplayValue(weights.rearSeats)} onChange={e => handleWeightChange('rearSeats', e.target.value)} unit={unitLabel} />
            <WeightInput icon={Fuel} label={STATIONS.fuel.label} value={fuelGal} onChange={e => handleFuelChange(e.target.value)} unit="gal" max={LIMITS.fuelMaxGal} />
            <WeightInput icon={Droplets} label="Fuel Burn" value={plannedFuelBurnGal} onChange={e => handleFuelBurnChange(e.target.value)} unit="gal" />
            <WeightInput icon={Luggage} label={STATIONS.baggageA.label} value={getDisplayValue(weights.baggageA)} onChange={e => handleWeightChange('baggageA', e.target.value)} unit={unitLabel} max={isKg ? Math.round(LIMITS.baggageAMax / KG_TO_LB) : LIMITS.baggageAMax} />
            <WeightInput icon={Luggage} label={STATIONS.baggageB.label} value={getDisplayValue(weights.baggageB)} onChange={e => handleWeightChange('baggageB', e.target.value)} unit={unitLabel} max={isKg ? Math.round(LIMITS.baggageBMax / KG_TO_LB) : LIMITS.baggageBMax}/>
            <WeightInput icon={Luggage} label={STATIONS.baggageC.label} value={getDisplayValue(weights.baggageC)} onChange={e => handleWeightChange('baggageC', e.target.value)} unit={unitLabel} max={isKg ? Math.round(LIMITS.baggageCMax / KG_TO_LB) : LIMITS.baggageCMax}/>
        </div>
        
        {isBaggageOverLimit && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Total baggage weight exceeds the {LIMITS.totalBaggageMax} lb limit.
            </AlertDescription>
          </Alert>
        )}

        <Separator />

        {/* Totals */}
        <div className="space-y-2 pt-2">
            <div className={`flex justify-between items-center font-medium ${calculation.totalWeight > LIMITS.maxWeight ? 'text-destructive' : ''}`}>
                <p>Total Weight</p>
                <div className="flex items-center gap-2">
                  {calculation.totalWeight > LIMITS.maxWeight && <AlertCircle className="h-4 w-4" />}
                  <p>{calculation.totalWeight.toFixed(2)} lb</p>
                </div>
            </div>
             <div className={`flex justify-between items-center font-medium ${!calculation.isWithinLimits ? 'text-destructive' : ''}`}>
                <p>Center of Gravity</p>
                 <div className="flex items-center gap-2">
                  {!calculation.isWithinLimits && <AlertCircle className="h-4 w-4" />}
                  <p>{calculation.totalCg.toFixed(2)} in</p>
                </div>
            </div>
            <div className={`flex justify-between items-center font-medium text-sm text-muted-foreground ${!calculation.isLandingWeightOk ? 'text-destructive' : ''}`}>
                <p>Landing Weight</p>
                <div className="flex items-center gap-2">
                  {!calculation.isLandingWeightOk && <AlertCircle className="h-4 w-4" />}
                  <p>{calculation.landingWeight.toFixed(2)} lb</p>
                </div>
            </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm font-medium">Show Calculations</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2 text-sm text-muted-foreground">
                 <CalculationRow label="Empty Weight Moment" value={AIRCRAFT_SPECS.emptyMoment.toFixed(2)} />
                 <CalculationRow label="Pilot Moment" value={calculation.moments.pilot.toFixed(2)} />
                 <CalculationRow label="Co-Pilot Moment" value={calculation.moments.coPilot.toFixed(2)} />
                 <CalculationRow label="Rear Passengers Moment" value={calculation.moments.rearSeats.toFixed(2)} />
                 <CalculationRow label="Fuel Moment" value={calculation.moments.fuel.toFixed(2)} />
                 <CalculationRow label="Baggage A Moment" value={calculation.moments.baggageA.toFixed(2)} />
                 <CalculationRow label="Baggage B Moment" value={calculation.moments.baggageB.toFixed(2)} />
                 <CalculationRow label="Baggage C Moment" value={calculation.moments.baggageC.toFixed(2)} />
                 <Separator className="my-2"/>
                 <CalculationRow label="Total Moment" value={calculation.moments.total.toFixed(2)} isBold={true} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </CardContent>
      <CardFooter className="flex gap-2">
        <Dialog open={isSaveOpen} onOpenChange={setSaveOpen}>
          <DialogTrigger asChild><Button variant="outline" className="w-full"><Save className="mr-2"/> Save Profile</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Save Profile</DialogTitle><DialogDescription>Enter a name for your current weight setup.</DialogDescription></DialogHeader>
            <Input value={profileName} onChange={e => setProfileName(e.target.value)} placeholder="e.g., Two people, full fuel" />
            <DialogFooter><Button onClick={saveProfile}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isLoadOpen} onOpenChange={setLoadOpen}>
          <DialogTrigger asChild><Button className="w-full" disabled={profiles.length === 0}><FolderOpen className="mr-2"/> Load Profile</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Load Profile</DialogTitle><DialogDescription>Select a saved profile to load.</DialogDescription></DialogHeader>
            <Select onValueChange={loadProfile}>
              <SelectTrigger><SelectValue placeholder="Select a profile" /></SelectTrigger>
              <SelectContent>
                {profiles.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

// Sub-component for inputs
function WeightInput({ icon: Icon, label, value, onChange, unit, max }: { icon: React.ElementType, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, unit: string, max?: number }) {
  const numericValue = parseInt(value, 10);
  const hasWarning = max && !isNaN(numericValue) && numericValue > max;

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <Label htmlFor={label} className="col-span-1 flex items-center gap-2 text-sm">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
      </Label>
      <div className="col-span-2 relative">
         <Input id={label} type="number" value={value} onChange={onChange} placeholder="0" className={`pr-10 ${hasWarning ? 'border-destructive' : ''}`} step="1" />
         <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">{unit}</span>
      </div>
      {max && (
        <Popover>
          <PopoverTrigger asChild>
            <p className={`col-start-2 col-span-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground ${hasWarning ? 'text-destructive font-semibold' : ''}`}>
              Limit: {max} {unit}
            </p>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 text-xs">Max allowable {unit === 'gal' ? 'fuel' : 'weight'} for this station.</PopoverContent>
        </Popover>
      )}
    </div>
  );
}

// Sub-component for calculation rows
function CalculationRow({ label, value, isBold = false }: { label: string, value: string, isBold?: boolean }) {
  return (
    <div className={`flex justify-between items-center ${isBold ? 'font-semibold text-foreground' : ''}`}>
      <p>{label}</p>
      <p>{value} lb-in</p>
    </div>
  );
}

    

    