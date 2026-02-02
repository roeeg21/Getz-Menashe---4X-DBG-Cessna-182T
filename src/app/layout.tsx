import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Getz Menashe - 4X-DBG Cessna 182T',
  description: 'Weight & Balance, Weather, and AI-powered flight tools for the Cessna 182T.',
  applicationName: 'Cessna 182T Dashboard',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cessna 182T',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#F0F8FF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body className={cn('font-body antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
