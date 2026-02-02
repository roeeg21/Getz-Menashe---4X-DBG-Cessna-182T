import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4 rounded-xl border-2 bg-card p-8 text-center shadow-lg">
        <WifiOff className="h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold">You are Offline</h1>
        <p className="text-muted-foreground">
          Please check your internet connection and try again.
        </p>
      </div>
    </div>
  );
}
