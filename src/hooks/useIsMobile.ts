import { useState, useEffect, useCallback } from 'react';

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    // Use matchMedia for more efficient device detection
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mobileQuery.matches);
  }, []);

  useEffect(() => {
    // Initial check
    checkMobile();

    // Use matchMedia for more efficient listening
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    
    // Modern browsers support addEventListener on matchMedia
    const handler = debounce(() => checkMobile(), 100);
    
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', handler);
      return () => mobileQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      const resizeHandler = debounce(() => checkMobile(), 100);
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
    }
  }, [checkMobile]);

  return isMobile;
}; 