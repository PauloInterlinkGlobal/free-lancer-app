import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Column, TableProps } from './table';
import { TableRowMenu } from './table-row-menu';

interface TableGridProps<T> extends Omit<TableProps<T>, 'pagination'> {
  toggle?: ReactNode;
  pager?: ReactNode;
}

export function TableGrid<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage,
  keyExtractor,
  onRowClick,
  className,
  toggle,
  pager,
}: TableGridProps<T>) {
  const actionCol = columns.find((col) => col.actions);
  const [titleCol, ...detailCols] = columns.filter((col) => !col.actions);

  const renderValue = (col: Column<T>, item: T, index: number) =>
    col.render
      ? col.render(item, index)
      : (item[col.key as keyof T] as ReactNode);

  return (
    <div className={twMerge('flex w-full flex-col gap-3', className)}>
      {toggle}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-surface-subtle/60"
            />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-2xl border border-ui bg-surface px-6 py-12 text-center text-sm text-muted-content">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={keyExtractor ? keyExtractor(item, index) : index}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
              className={twMerge(
                'flex flex-col gap-3 rounded-2xl border border-ui bg-surface p-4 shadow-sm transition-colors hover:bg-item-hover',
                onRowClick && 'cursor-pointer'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 text-sm font-semibold text-primary-content">
                  {titleCol && renderValue(titleCol, item, index)}
                </div>
                {actionCol?.actions && (
                  <TableRowMenu actions={actionCol.actions(item, index)} />
                )}
              </div>

              <dl className="flex flex-col gap-2 border-t border-dashed border-ui pt-3">
                {detailCols.map((col) => (
                  <div
                    key={String(col.key)}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <dt className="shrink-0 text-xs text-muted-content">
                      {col.header}
                    </dt>
                    <dd className="min-w-0 truncate text-right text-secondary-content">
                      {renderValue(col, item, index)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      )}

      {pager && (
        <div className="overflow-hidden rounded-2xl border border-ui bg-surface">
          {pager}
        </div>
      )}
    </div>
  );
}
