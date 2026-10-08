import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableCellProps extends ComponentProps<'td'> {}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      {...props}
      className={twMerge(
        'py-3.5 px-6 text-sm text-secondary-content border-b border-ui',
        className
      )}
    />
  );
}
