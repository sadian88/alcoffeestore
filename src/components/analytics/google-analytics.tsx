
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logEvent } from 'firebase/analytics';
import { getAnalyticsInstance, firebaseConfig } from '@/lib/firebase';

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This effect ensures GA is initialized.
    // Firebase's getAnalytics() usually triggers an initial page_view automatically
    // if measurementId is in firebaseConfig.
    const initializeGa = async () => {
      await getAnalyticsInstance(); // Ensures analytics is initialized
    };
    initializeGa();
  }, []);

  useEffect(() => {
    const handleRouteChange = async () => {
      const analytics = await getAnalyticsInstance();
      if (analytics) {
        const url = pathname + (searchParams ? searchParams.toString() : '');
        logEvent(analytics, 'page_view', {
          page_path: url,
          page_title: document.title,
          page_location: window.location.href, // Full URL
          measurement_id: firebaseConfig.measurementId, // Optional, but good for clarity
        });
      }
    };

    // Call it once to log the initial page view (or subsequent if path changes)
    handleRouteChange();
    
  }, [pathname, searchParams]); // Rerun when path or search params change

  return null; // This component does not render anything visible
}
