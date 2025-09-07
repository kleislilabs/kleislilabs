'use client';

import React, { useEffect, useState } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';

interface CalCtaProps extends Omit<ButtonProps, 'onClick' | 'asChild'> {
  calLink?: string;
  onBookingSuccess?: (data: unknown) => void;
}

export function CalCta({ 
  children = 'Book a Discovery Call',
  calLink = 'ipm0b/discovery',
  onBookingSuccess,
  className,
  ...buttonProps 
}: CalCtaProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Detect current theme
    const detectTheme = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
      setTheme(currentTheme);
    };

    detectTheme();

    // Watch for theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    (async function() {
      const cal = await getCalApi({ namespace: 'discovery' });
      
      // Use Cal.com's default themes - they're already well-designed
      cal('ui', {
        theme: theme,
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
      
      // Listen for booking success event
      cal('on', {
        action: 'bookingSuccessful',
        callback: (e: { detail: unknown }) => {
          console.log('✅ Booking successful:', e.detail);
          
          // Analytics callback placeholder
          if (typeof window !== 'undefined' && 'gtag' in window) {
            const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
            if (gtag) {
              gtag('event', 'booking_success', {
                event_category: 'engagement',
                event_label: 'discovery_call',
                value: 1
              });
            }
          }
          
          // Custom callback
          if (onBookingSuccess) {
            onBookingSuccess(e.detail);
          }
        }
      });
    })();
  }, [onBookingSuccess, theme]);

  const handleClick = async () => {
    const cal = await getCalApi({ namespace: 'discovery' });
    cal('modal', {
      calLink,
      config: {
        theme: theme
      }
    });
  };

  return (
    <>
      <Button 
        onClick={handleClick}
        className={cn('', className)}
        {...buttonProps}
      >
        {children}
      </Button>
      
      {/* Fallback for users with JavaScript disabled */}
      <noscript>
        <a 
          href={`https://cal.com/${calLink}?overlayCalendar=true`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
            'rounded-md px-4 py-2 text-sm',
            'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
            className
          )}
        >
          {children}
        </a>
      </noscript>
    </>
  );
}