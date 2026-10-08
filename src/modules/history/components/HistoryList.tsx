import { IHistorySms } from '@/modules/history/interfaces/history';
import {
  filterHistorySms,
  paginate,
  type HistoryFiltersValue,
} from '@/modules/history/utils/history-filters';
import { HistoryFilters } from './HistoryFilters';
import { HistoryTable } from './HistoryTable';

interface HistoryListProps {
  data: IHistorySms[];
  filters: HistoryFiltersValue;
}

export function HistoryList({ data, filters }: HistoryListProps) {
  const { items, currentPage, totalPages } = paginate(
    filterHistorySms(data, filters),
    filters.page
  );

  return (
    <div className="flex flex-col gap-4">
      <HistoryFilters />

      <HistoryTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
