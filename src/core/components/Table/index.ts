import {
  TableRoot,
  type Column,
  type TableProps,
} from '@/core/components/Table/table';
import { TableActions } from '@/core/components/Table/table-actions';
import { TableCell } from '@/core/components/Table/table-cell';
import { TableHeader } from '@/core/components/Table/table-header';
import { TableRow } from '@/core/components/Table/table-row';
import type { RowAction } from '@/core/components/Table/table-row-menu';

export type { Column, RowAction, TableProps };

interface TableComponent {
  <T extends Record<string, any>>(
    props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
  ): React.ReactElement;
  Header: typeof TableHeader;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  Actions: typeof TableActions;
}

const Table = TableRoot as unknown as TableComponent;

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Actions = TableActions;

export { Table };
