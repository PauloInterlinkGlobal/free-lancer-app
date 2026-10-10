'use client';

import { forwardRef, useState, type ForwardedRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Pagination from '../Pagination/Pagination';
import { TableCell } from './table-cell';
import { TableGrid } from './table-grid';
import { TableHeader } from './table-header';
import { TableRow } from './table-row';
import { TableRowMenu, type RowAction } from './table-row-menu';
import { TableSkeleton } from './table-skeleton';
import { ViewToggle, type ViewMode } from './view-toggle';

export interface Column<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (item: T, index: number) => ReactNode;
  actions?: (item: T, index: number) => RowAction[];
  className?: string;
  headerClassName?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TablePagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  onRowClick?: (item: T) => void;
  className?: string;
  pagination?: TablePagination;
  allowGrid?: boolean;
}

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

const resolveAlign = <T,>(col: Column<T>) =>
  alignClass[col.align ?? (col.actions ? 'right' : 'left')];

function TableRootInner<T extends Record<string, any>>(
  {
    columns,
    data,
    loading = false,
    emptyMessage = 'Nenhum registo encontrado.',
    keyExtractor,
    onRowClick,
    className,
    pagination,
    allowGrid = false,
  }: TableProps<T>,
  ref: ForwardedRef<HTMLTableElement>
) {
  const [view, setView] = useState<ViewMode>('list');
  const isGrid = allowGrid && view === 'grid';

  const toggle = allowGrid && (
    <div className="flex justify-end">
      <ViewToggle value={view} onChange={setView} />
    </div>
  );

  const pager = pagination && (
    <Pagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={pagination.onPageChange}
      isLoading={loading}
    />
  );

  if (isGrid) {
    return (
      <TableGrid
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage={emptyMessage}
        keyExtractor={keyExtractor}
        onRowClick={onRowClick}
        className={className}
        toggle={toggle}
        pager={pager}
      />
    );
  }

  const tableView = (
    <div
      className={twMerge(
        'w-full overflow-hidden rounded-2xl border border-ui bg-surface shadow-sm',
        !allowGrid && className
      )}
    >
      <div className="overflow-x-auto">
        <table ref={ref} className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map((col) => (
                <TableHeader
                  key={String(col.key)}
                  className={twMerge(resolveAlign(col), col.headerClassName)}
                >
                  {col.header}
                </TableHeader>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <TableSkeleton columnsCount={columns.length} />
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 px-6 text-center text-sm text-muted-content"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={keyExtractor ? keyExtractor(item, index) : index}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  className={onRowClick ? 'cursor-pointer' : undefined}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={twMerge(resolveAlign(col), col.className)}
                    >
                      {col.actions ? (
                        <TableRowMenu actions={col.actions(item, index)} />
                      ) : col.render ? (
                        col.render(item, index)
                      ) : (
                        (item[col.key as keyof T] as ReactNode)
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pager}
    </div>
  );

  if (!allowGrid) return tableView;

  return (
    <div className={twMerge('flex w-full flex-col gap-3', className)}>
      {toggle}
      {tableView}
    </div>
  );
}

interface TableRootComponent {
  <T extends Record<string, any>>(
    props: TableProps<T> & { ref?: ForwardedRef<HTMLTableElement> }
  ): React.ReactElement;
}

export const TableRoot = forwardRef(
  TableRootInner
) as unknown as TableRootComponent;
