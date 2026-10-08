'use client';

import { LinearIndeterminate } from '@/core/components/Loading';

export default function CardProgressBar({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return (
      <div suppressHydrationWarning className="h-1 w-full" aria-hidden="true" />
    );
  }

  return (
    <div
      suppressHydrationWarning
      className="absolute top-0 right-0 left-0 md:left-1/2 dark:md:left-0 z-30 overflow-hidden transition-all"
    >
      <LinearIndeterminate />
    </div>
  );
}
