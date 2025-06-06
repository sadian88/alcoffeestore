
import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout'; 
import { Toaster } from "@/components/ui/toaster"; 
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'alCoffee - Amor en cada taza.',
  description: 'Arma tu kit de café personalizado o elige uno prediseñado. Amor en cada taza.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
