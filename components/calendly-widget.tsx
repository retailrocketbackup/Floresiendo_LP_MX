"use client"

import React, { useEffect } from 'react';

export function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="calendly-inline-widget w-full h-full" data-url="https://calendly.com/ramonhenriquez/15min" style={{ minWidth: '320px', height: '700px' }}></div>
  );
}
