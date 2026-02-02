'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ALL_CHECKLISTS, SOURCE_NOTES, type ChecklistSection, type Checklist } from '@/lib/checklist-data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RotateCw, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const STORAGE_KEY_PREFIX = 'c182t-checklist-state';

function getStorageKey(checklistId: string) {
    return `${STORAGE_KEY_PREFIX}-${checklistId}`;
}


export default function PreflightChecklist() {
  const [currentChecklistId, setCurrentChecklistId] = useState<string>(ALL_CHECKLISTS[0].id);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  const currentChecklist = useMemo(() => {
    return ALL_CHECKLISTS.find(c => c.id === currentChecklistId) || ALL_CHECKLISTS[0];
  }, [currentChecklistId]);

  useEffect(() => {
    setIsClient(true);
    try {
      setCurrentSectionIndex(0);
      const savedState = localStorage.getItem(getStorageKey(currentChecklistId));
      if (savedState) {
        setCheckedItems(JSON.parse(savedState));
      } else {
        setCheckedItems({});
      }
    } catch (error) {
      console.error("Failed to load checklist state from localStorage", error);
      setCheckedItems({});
    }
  }, [currentChecklistId]);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(getStorageKey(currentChecklistId), JSON.stringify(checkedItems));
      } catch (error) {
        console.error("Failed to save checklist state to localStorage", error);
      }
    }
  }, [checkedItems, isClient, currentChecklistId]);


  const handleCheckChange = useCallback((itemId: string, isChecked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: isChecked }));
  }, []);

  const handleSectionReset = (section: ChecklistSection) => {
    const newCheckedItems = { ...checkedItems };
    section.items?.forEach(item => {
      const uniqueId = `${section.id}-${item.n}`;
      delete newCheckedItems[uniqueId];
    });
    setCheckedItems(newCheckedItems);
  };

  const handleFullReset = () => {
    setCheckedItems({});
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSectionIndex < currentChecklist.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const overallProgress = useMemo(() => {
    const totalItems = currentChecklist.sections.reduce((sum, section) => sum + (section.items?.length || 0), 0);
    if (totalItems === 0) return 0;
    
    const allItemIds = currentChecklist.sections.flatMap(s => s.items?.map(i => `${s.id}-${i.n}`) ?? []);
    const checkedCount = allItemIds.filter(id => checkedItems[id]).length;
    
    return (checkedCount / totalItems) * 100;
  }, [checkedItems, currentChecklist]);

  const isOverallComplete = overallProgress === 100;
  const currentSection = currentChecklist.sections[currentSectionIndex];
  const totalSections = currentChecklist.sections.length;
  const stepProgress = totalSections > 0 ? ((currentSectionIndex + 1) / totalSections) * 100 : 0;

  if (!isClient) {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded-full w-full"></div>
                    <div className="h-4 bg-muted rounded-full w-1/4"></div>
                </div>
                <div className="h-9 w-28 bg-muted rounded-md"></div>
            </div>
            <div className="space-y-4">
                <div className="h-20 bg-muted rounded-xl w-full"></div>
                <div className="h-20 bg-muted rounded-xl w-full"></div>
                <div className="h-20 bg-muted rounded-xl w-full"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-col gap-4 border-b p-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Select value={currentChecklistId} onValueChange={setCurrentChecklistId}>
            <SelectTrigger className="w-full border-2 shadow-md sm:w-[300px]">
              <SelectValue placeholder="Select a checklist..." />
            </SelectTrigger>
            <SelectContent>
              {ALL_CHECKLISTS.map((checklist) => (
                <SelectItem key={checklist.id} value={checklist.id}>
                  {checklist.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex w-full flex-1 items-center gap-4">
            <div className="flex-1">
              <span className="mb-2 block text-center text-sm text-muted-foreground">
                Step {currentSectionIndex + 1} of {totalSections}: {currentSection.title}
              </span>
              <Progress value={stepProgress} />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <RotateCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset the entire <span className="font-bold">{currentChecklist.title}</span>. All your checked items will be cleared.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleFullReset}>Reset</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
        <div className="rounded-xl border-2 bg-card p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">{currentSection.title}</h2>
          
          {currentSection.notes && currentSection.notes.length > 0 && (
            <div className="mb-4 rounded-lg border-2 border-destructive bg-destructive/10 p-4 shadow-inner">
              {currentSection.notes.map((note, i) => (
                <p key={i} className="text-center text-base font-bold uppercase text-destructive">{note}</p>
              ))}
            </div>
          )}

          {currentSection.type === 'reference_table' && currentSection.entries && (
            <div className="space-y-2 text-sm">
              {currentSection.entries.map(entry => (
                <div key={entry.key} className="flex justify-between items-center rounded-md bg-muted/50 p-3">
                  <span className="font-medium">{entry.key}</span>
                  <span className="font-mono">{entry.value}</span>
                </div>
              ))}
            </div>
          )}

          {currentSection.type === 'reference_note' && currentSection.text && (
            <div className="rounded-md bg-muted/30 p-4 text-sm italic text-muted-foreground">
              <p>{currentSection.text}</p>
            </div>
          )}

          {currentSection.items && currentSection.items.length > 0 && (
            <div className="flex flex-col gap-4 pt-4">
              {currentSection.items.map(item => {
                const uniqueId = `${currentSection.id}-${item.n}`;
                return (
                  <div key={uniqueId} className="flex items-center gap-4 rounded-md bg-muted/50 p-3">
                    <Checkbox
                      id={uniqueId}
                      checked={!!checkedItems[uniqueId]}
                      onCheckedChange={(checked) => handleCheckChange(uniqueId, !!checked)}
                      className="peer h-6 w-6 rounded-full"
                    />
                    <label
                      htmlFor={uniqueId}
                      className={cn(
                        "flex-1 cursor-pointer text-base transition-colors peer-data-[state=checked]:text-muted-foreground peer-data-[state=checked]:line-through"
                      )}
                    >
                      {item.text}
                    </label>
                  </div>
                )
              })}
              <div className="mt-2 flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => handleSectionReset(currentSection)}>
                  <RotateCw className="mr-2 h-4 w-4" /> Reset Section
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {currentSectionIndex === totalSections - 1 && isOverallComplete && (
            <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-accent bg-card p-6 text-center shadow-lg">
                <CheckCircle2 className="h-12 w-12 text-accent"/>
                <h2 className="text-2xl font-semibold text-accent-foreground">Checklist Complete</h2>
                <p className="text-muted-foreground">You have completed all items in the {currentChecklist.title}.</p>
            </div>
        )}
      </main>

      <footer className="flex items-center justify-between border-t bg-background p-4">
        <Button onClick={handlePrevious} disabled={currentSectionIndex === 0} size="lg" variant="outline">
          <ChevronLeft className="mr-2 h-5 w-5" /> Previous
        </Button>
        <Button onClick={handleNext} disabled={currentSectionIndex >= totalSections - 1} size="lg">
          Next <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </footer>
    </div>
  );
}
