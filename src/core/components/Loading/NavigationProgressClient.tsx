'use client';

import { usePathname } from '@/core/i18n/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

type Timer = ReturnType<typeof setTimeout> | undefined;

export function startNavigationProgress() {
  window.dispatchEvent(new Event('nav-progress-start'));
}

export function NavigationProgressClient() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const showTimer = useRef<Timer>(undefined);
  const safetyTimer = useRef<Timer>(undefined);

  const stop = useCallback(() => {
    clearTimeout(showTimer.current);
    clearTimeout(safetyTimer.current);
    setLoading(false);
  }, []);

  const start = useCallback(() => {
    clearTimeout(showTimer.current);
    clearTimeout(safetyTimer.current);
    showTimer.current = setTimeout(() => setLoading(true), 100);
    safetyTimer.current = setTimeout(stop, 15000);
  }, [stop]);

  useEffect(() => {
    stop();
  }, [pathname, stop]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor || !anchor.href) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      start();
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener('nav-progress-start', start);

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('nav-progress-start', start);
      clearTimeout(showTimer.current);
      clearTimeout(safetyTimer.current);
    };
  }, [start]);

  if (!loading) return null;

  return (
    <div
      role="progressbar"
      aria-label="A carregar…"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden bg-primary/20"
    >
      <span className="nav-progress-bar-1 absolute inset-y-0 w-auto bg-primary" />
      <span className="nav-progress-bar-2 absolute inset-y-0 w-auto bg-primary" />
    </div>
  );
}
