import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableRowProps extends ComponentProps<'tr'> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        {...props}
        ref={ref}
        className={twMerge(
          'group transition-colors duration-150 hover:bg-item-hover',
          '[&:last-child>td]:border-b-0',
          className
        )}
      />
    );
  }
);

TableRow.displayName = 'TableRow';
