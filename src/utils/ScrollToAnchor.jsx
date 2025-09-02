'use client';
import { useEffect, useRef } from 'react';
//import { useLocation } from 'react-router-dom';
import { usePathname } from 'next/navigation';

function ScrollToAnchor() {
  const pathname = usePathname();
  const lastHash = useRef('');

  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      lastHash.current = hash.slice(1); // safe hash for further use after navigation
    }
    
    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      }, 100);
    }
  }, [pathname]);

  return null;
}

export default ScrollToAnchor;