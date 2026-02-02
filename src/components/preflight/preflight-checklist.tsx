'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ALL_CHECKLISTS, SOURCE_NOTES, type ChecklistSection, type Checklist } from '@/lib/checklist-data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RotateCw, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"

const STORAGE_KEY_PREFIX = 'c182t-checklist-state';

function getStorageKey(checklistId: string) {
    return `${STORAGE_KEY_PREFIX}-${checklistId}`;
}


export default function PreflightChecklist() {
  const [currentChecklistId, setCurrentChecklistId] = useState<string>(ALL_CHECKLISTS[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  const [api, setApi] = useState<CarouselApi>()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const currentChecklist = useMemo(() => {
    return ALL_CHECKLISTS.find(c => c.id === currentChecklistId) || ALL_CHECKLISTS[0];
  }, [currentChecklistId]);

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = (api: CarouselApi) => {
      setCurrentSectionIndex(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    onSelect(api);
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api])


  useEffect(() => {
    setIsClient(true);
    try {
      // When the checklist ID changes, reset the section and load its state
      if (api) {
        api.scrollTo(0, true);
      }
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
  }, [currentChecklistId, api]);

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

  const handlePrevious = useCallback(() => api?.scrollPrev(), [api]);
  const handleNext = useCallback(() => api?.scrollNext(), [api]);


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

  if (!isClient || !currentSection) {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
            <div className="h-12 bg-muted rounded-xl w-full mb-4"></div>
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded-full w-full"></div>
                    <div className="h-4 bg-muted rounded-full w-1/4"></div>
                </div>
                <div className="h-9 w-28 bg-muted rounded-md"></div>
            </div>
            <div className="space-y-4">
                <div className="h-64 bg-muted rounded-xl w-full"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-col gap-4 border-b p-4">
        {/* Horizontal Checklist Selector */}
        <div className="w-full overflow-x-auto pb-2">
            <div className="flex w-max space-x-2">
                {ALL_CHECKLISTS.map((checklist) => (
                    <Button
                        key={checklist.id}
                        variant={currentChecklistId === checklist.id ? 'default' : 'outline'}
                        onClick={() => setCurrentChecklistId(checklist.id)}
                        className="shrink-0 rounded-full px-4 py-2 shadow-sm"
                    >
                        {checklist.title}
                    </Button>
                ))}
            </div>
        </div>

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
      </header>

      <Carousel setApi={setApi} className="w-full flex-1">
        <CarouselContent className="h-full">
          {currentChecklist.sections.map((section) => (
            <CarouselItem key={section.id} className="h-full overflow-y-auto p-4 md:p-6">
                <div className="rounded-xl border-2 bg-card p-6 shadow-lg">
                    <h2 className="mb-4 text-xl font-bold">{section.title}</h2>
                    
                    {section.notes && section.notes.length > 0 && (
                      <div className="mb-4 space-y-1">
                          {section.notes.map((note, i) => (
                            <div key={i} className="rounded-lg border-2 border-destructive bg-destructive/10 p-4 shadow-inner">
                               <p className="text-center text-base font-bold uppercase text-destructive">{note}</p>
                            </div>
                          ))}
                      </div>
                    )}

                    {section.type === 'reference_table' && section.entries && (
                      <div className="space-y-2 text-sm">
                        {section.entries.map(entry => (
                          <div key={entry.key} className="flex justify-between items-center rounded-md bg-muted/50 p-3">
                            <span className="font-medium">{entry.key}</span>
                            <span className="font-mono">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.type === 'reference_note' && section.text && (
                      <div className="rounded-md bg-muted/30 p-4 text-sm italic text-muted-foreground">
                        <p>{section.text}</p>
                      </div>
                    )}

                    {section.items && section.items.length > 0 && (
                      <div className="flex flex-col gap-4 pt-4">
                        {section.items.map(item => {
                          const uniqueId = `${section.id}-${item.n}`;
                          return (
                            <div key={uniqueId} className="flex items-center gap-4 rounded-md bg-muted/50 p-3">
                               <Checkbox
                                id={uniqueId}
                                checked={!!checkedItems[uniqueId]}
                                onCheckedChange={(checked) => handleCheckChange(uniqueId, !!checked)}
                                className="peer h-6 w-6 shrink-0 rounded-full"
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
                          <Button variant="ghost" size="sm" onClick={() => handleSectionReset(section)}>
                            <RotateCw className="mr-2 h-4 w-4" /> Reset Section
                          </Button>
                        </div>
                      </div>
                    )}
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
        
      {currentSectionIndex === totalSections - 1 && isOverallComplete && (
          <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-accent bg-card p-6 text-center shadow-lg m-4">
              <CheckCircle2 className="h-12 w-12 text-accent"/>
              <h2 className="text-2xl font-semibold text-accent-foreground">Checklist Complete</h2>
              <p className="text-muted-foreground">You have completed all items in the {currentChecklist.title}.</p>
          </div>
      )}

      <footer className="flex items-center justify-between border-t bg-background p-4">
        <Button onClick={handlePrevious} disabled={!canScrollPrev} size="lg" variant="outline">
          <ChevronLeft className="mr-2 h-5 w-5" /> Previous
        </Button>
        <Button onClick={handleNext} disabled={!canScrollNext} size="lg">
          Next <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </footer>
    </div>
  );
}
