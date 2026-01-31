import { Plane, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Plane className="h-6 w-6 text-primary" />
        <h1 className="text-lg md:text-xl font-semibold">Getz Menashe - 4X-DBG</h1>
      </div>
      <nav>
        <Link href="/preflight" passHref>
          <Button variant="outline">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Preflight Checklist
          </Button>
        </Link>
      </nav>
    </header>
  );
}
