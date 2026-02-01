'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ALL_CHECKLISTS, SOURCE_NOTES, type ChecklistSection, type Checklist } from '@/lib/checklist-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RotateCw, CheckCircle2 } from 'lucide-react';
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
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  const currentChecklist = useMemo(() => {
    return ALL_CHECKLISTS.find(c => c.id === currentChecklistId) || ALL_CHECKLISTS[0];
  }, [currentChecklistId]);

  useEffect(() => {
    setIsClient(true);
    try {
      // When checklist changes, load its state or reset if none is saved
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

  const progress = useMemo(() => {
    const totalItems = currentChecklist.sections.reduce((sum, section) => sum + (section.items?.length || 0), 0);
    if (totalItems === 0) return 0;
    const completedItems = Object.keys(checkedItems).filter(key => checkedItems[key] && key.startsWith(currentChecklist.id)).length;
    
    // Correctly filter checked items for the current checklist
    const allItemsForCurrentChecklist = currentChecklist.sections.flatMap(s => s.items?.map(i => `${s.id}-${i.n}`) ?? []);
    const checkedForCurrent = allItemsForCurrentChecklist.filter(id => checkedItems[id]).length;
    
    return (checkedForCurrent / totalItems) * 100;
  }, [checkedItems, currentChecklist]);
  
  const isComplete = progress === 100;

  if (!isClient) {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
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
    <div className="w-full max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
             <Select value={currentChecklistId} onValueChange={setCurrentChecklistId}>
                <SelectTrigger className="w-full sm:w-[300px] border-2 shadow-md">
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

           <div className="flex-1 w-full flex items-center gap-4">
                <div className="flex-1">
                    <Progress value={progress} />
                    <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% Complete</p>
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
        
        {isComplete && (
            <div className="mb-6 flex flex-col items-center gap-4 rounded-lg border-2 border-accent bg-card p-6 text-center shadow-lg">
                <CheckCircle2 className="h-12 w-12 text-accent"/>
                <h2 className="text-2xl font-semibold text-accent-foreground">Checklist Complete</h2>
                <p className="text-muted-foreground">You are ready for the next phase of flight preparation.</p>
            </div>
        )}

      <Accordion type="single" collapsible className="w-full" defaultValue={currentChecklist.sections[0]?.id}>
        {currentChecklist.sections.map((section) => {
          const sectionItems = section.items || [];
          const sectionEntries = section.entries || [];
          const totalInSection = sectionItems.length;
          const completedInSection = sectionItems.filter(item => {
              const uniqueId = `${section.id}-${item.n}`;
              return checkedItems[uniqueId];
          }).length;
          const sectionProgress = totalInSection > 0 ? (completedInSection / totalInSection) * 100 : 0;
          const isSectionComplete = sectionProgress === 100 && totalInSection > 0;

          return (
            <AccordionItem value={section.id} key={section.id}>
              <AccordionTrigger>
                <div className="flex justify-between items-center w-full pr-4">
                  <div className="flex items-center gap-4">
                    {totalInSection > 0 && <CheckCircle2 className={cn("h-6 w-6 transition-colors", isSectionComplete ? 'text-accent' : 'text-muted-foreground/50')} />}
                    <span className="text-left">{section.title}</span>
                  </div>
                  {totalInSection > 0 && <span className="text-base text-muted-foreground">{completedInSection} / {totalInSection}</span>}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {section.notes && section.notes.length > 0 && (
                  <div className="mb-4 rounded-lg border-2 border-destructive bg-destructive/10 p-4 shadow-inner">
                    {section.notes.map((note, i) => <p key={i} className="text-center text-base font-bold uppercase text-destructive">{note}</p>)}
                  </div>
                )}
                
                {section.type === 'reference_table' && sectionEntries.length > 0 && (
                    <div className="space-y-2 pt-2 text-sm">
                        {sectionEntries.map(entry => (
                            <div key={entry.key} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                                <span className="font-medium">{entry.key}</span>
                                <span className="font-mono">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {section.type === 'reference_note' && section.text && (
                    <div className="pt-2 text-sm text-muted-foreground italic bg-muted/30 p-4 rounded-md">
                        <p>{section.text}</p>
                    </div>
                )}

                {sectionItems.length > 0 && (
                    <div className="flex flex-col gap-4 pt-4">
                    {sectionItems.map(item => {
                        const uniqueId = `${section.id}-${item.n}`;
                        return (
                        <div key={uniqueId} className="flex items-center gap-4 rounded-md p-3 bg-muted/50">
                          <Checkbox
                              id={uniqueId}
                              checked={!!checkedItems[uniqueId]}
                              onCheckedChange={(checked) => handleCheckChange(uniqueId, !!checked)}
                              className="peer h-6 w-6 rounded-full"
                          />
                          <label
                              htmlFor={uniqueId}
                              className={cn(
                              "flex-1 text-base cursor-pointer transition-colors peer-data-[state=checked]:line-through peer-data-[state=checked]:text-muted-foreground"
                              )}
                          >
                              {item.text}
                          </label>
                        </div>
                    )})}
                    {totalInSection > 0 && (
                      <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSectionReset(section)}>
                          <RotateCw className="mr-2 h-4 w-4" /> Reset Section
                          </Button>
                      </div>
                    )}
                    </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <footer className="mt-8 space-y-2 text-center text-xs text-muted-foreground">
        {SOURCE_NOTES.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
      </footer>
    </div>
  );
}
