import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import PreflightChecklist from '@/components/preflight/preflight-checklist';

export default function PreflightPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
            <Link href="/" passHref>
                <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
            <h1 className="text-lg md:text-xl font-semibold">Preflight Checklist</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-2 sm:p-4 md:gap-8 md:p-8">
        <PreflightChecklist />
      </main>
    </div>
  );
}
