'use client';

import { useCallback, useEffect, useState } from 'react';
import { PopoverPlacement } from '../types';

interface UseDatePickerPlacementOptions {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  estimatedHeight?: number;
}

export function useDatePickerPlacement({
  isOpen,
  triggerRef,
  popoverRef,
  estimatedHeight = 370,
}: UseDatePickerPlacementOptions) {
  const [placement, setPlacement] = useState<PopoverPlacement>('bottom');

  const updatePlacement = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const popoverHeight = popoverRef.current?.offsetHeight || estimatedHeight;
    const buffer = 16;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < popoverHeight + buffer && spaceAbove > spaceBelow) {
      setPlacement('top');
    } else {
      setPlacement('bottom');
    }
  }, [triggerRef, popoverRef, estimatedHeight]);

  useEffect(() => {
    if (!isOpen) return;

    updatePlacement();

    const handleScrollOrResize = () => {
      updatePlacement();
    };

    window.addEventListener('scroll', handleScrollOrResize, {
      capture: true,
      passive: true,
    });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, updatePlacement]);

  return { placement, updatePlacement };
}
