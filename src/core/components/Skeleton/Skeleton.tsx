import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  count = 1,
}) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={twMerge(
            'bg-surface-raised rounded-md relative overflow-hidden',
            className
          )}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-surface-raised via-surface-subtle to-surface-raised" />
        </div>
      ))}
    </>
  );
};
