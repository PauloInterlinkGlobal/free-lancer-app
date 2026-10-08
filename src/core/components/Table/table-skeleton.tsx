'use client';

interface TableSkeletonProps {
  columnsCount?: number;
  rowsCount?: number;
}

export const TableSkeleton = ({
  columnsCount = 6,
  rowsCount = 5,
}: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rowsCount }).map((_, i) => (
        <tr key={i}>
          <td colSpan={columnsCount} className="py-3 px-6">
            <div className="h-10 w-full animate-pulse rounded-lg bg-surface-subtle/60" />
          </td>
        </tr>
      ))}
    </>
  );
};
