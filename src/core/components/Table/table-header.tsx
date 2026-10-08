import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableHeaderProps extends ComponentProps<'th'> {}

export function TableHeader({
  children,
  className,
  ...props
}: TableHeaderProps) {
  return (
    <th
      {...props}
      className={twMerge(
        'py-3.5 px-6 text-left text-[11px] font-semibold uppercase tracking-widest',
        'text-muted-content bg-surface-raised border-b border-ui',
        className
      )}
    >
      {children}
    </th>
  );
}
