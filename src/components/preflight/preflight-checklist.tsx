'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { PREFLIGHT_CHECKLIST, type ChecklistSection } from '@/lib/checklist-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RotateCw, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'c182t-preflight-state';

export default function PreflightChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        setCheckedItems(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Failed to load checklist state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
      } catch (error) {
        console.error("Failed to save checklist state to localStorage", error);
      }
    }
  }, [checkedItems, isClient]);

  const handleCheckChange = useCallback((itemId: string, isChecked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: isChecked }));
  }, []);

  const handleSectionReset = (section: ChecklistSection) => {
    const newCheckedItems = { ...checkedItems };
    section.items.forEach(item => {
      delete newCheckedItems[item.id];
    });
    setCheckedItems(newCheckedItems);
  };

  const handleFullReset = () => {
    setCheckedItems({});
  };

  const progress = useMemo(() => {
    const totalItems = PREFLIGHT_CHECKLIST.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = Object.values(checkedItems).filter(Boolean).length;
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  }, [checkedItems]);
  
  const isComplete = progress === 100;

  if (!isClient) {
    return null; // Don't render on the server
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
           <div className="flex-1">
                 <Progress value={progress} />
                 <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% Complete</p>
           </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <RotateCw className="mr-2 h-4 w-4" /> Reset All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset the entire preflight checklist. All your checked items will be cleared.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleFullReset}>Reset</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
        
        {isComplete && (
            <div className="mb-6 flex flex-col items-center gap-4 rounded-lg border border-accent bg-card p-6 text-center shadow-lg">
                <CheckCircle2 className="h-12 w-12 text-accent"/>
                <h2 className="text-2xl font-semibold text-accent-foreground">Preflight Complete</h2>
                <p className="text-muted-foreground">You are ready for the next phase of flight preparation.</p>
            </div>
        )}

      <Accordion type="single" collapsible className="w-full border-0" defaultValue="cabin">
        {PREFLIGHT_CHECKLIST.map((section, sectionIndex) => {
          const sectionItems = section.items;
          const completedInSection = sectionItems.filter(item => checkedItems[item.id]).length;
          const sectionProgress = (completedInSection / sectionItems.length) * 100;
          const isSectionComplete = sectionProgress === 100;

          return (
            <AccordionItem value={section.id} key={section.id}>
              <AccordionTrigger>
                <div className="flex justify-between items-center w-full pr-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className={cn("h-6 w-6 transition-colors", isSectionComplete ? 'text-accent' : 'text-muted-foreground/50')} />
                    <span className="text-left">{section.title}</span>
                  </div>
                  <span className="text-base text-muted-foreground">{completedInSection} / {sectionItems.length}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 pt-4">
                  {sectionItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between rounded-md p-3 bg-muted/50">
                      <label
                        htmlFor={item.id}
                        className={cn(
                          "text-base cursor-pointer transition-colors",
                          checkedItems[item.id] && "line-through text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </label>
                      <Checkbox
                        id={item.id}
                        checked={!!checkedItems[item.id]}
                        onCheckedChange={(checked) => handleCheckChange(item.id, !!checked)}
                        className="h-6 w-6 rounded-full"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" onClick={() => handleSectionReset(section)}>
                      <RotateCw className="mr-2 h-4 w-4" /> Reset Section
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>This app supplements the POH. The pilot in command is responsible for ensuring the aircraft is airworthy.</p>
      </footer>
    </div>
  );
}
