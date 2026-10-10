'use client';

import { useCallback, useEffect, useState } from 'react';
import { PopoverPlacement } from '../types';

interface UseSelectPlacementOptions {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  estimatedHeight?: number;
}

export function useSelectPlacement({
  isOpen,
  triggerRef,
  popoverRef,
  estimatedHeight = 220,
}: UseSelectPlacementOptions) {
  const [placement, setPlacement] = useState<PopoverPlacement>('bottom');

  const updatePlacement = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Só inverte para cima se o espaço abaixo for extremamente pequeno (< 130px)
    if (spaceBelow < 130 && spaceAbove > 180) {
      setPlacement('top');
    } else {
      setPlacement('bottom');
    }
  }, [triggerRef]);

  useEffect(() => {
    if (!isOpen) return;
    updatePlacement();
  }, [isOpen, updatePlacement]);

  return { placement, updatePlacement };
}
