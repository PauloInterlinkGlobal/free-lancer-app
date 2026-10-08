import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableActionsProps extends ComponentProps<'div'> {}

export function TableActions({ className, ...props }: TableActionsProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'flex items-center justify-end gap-1',
        'opacity-60 transition-opacity duration-150 group-hover:opacity-100',
        className
      )}
    />
  );
}
