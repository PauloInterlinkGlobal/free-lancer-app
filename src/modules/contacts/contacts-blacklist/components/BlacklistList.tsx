import { IBlacklist } from '@/modules/contacts/contacts-blacklist/interfaces/blacklist';
import {
  filterBlacklist,
  paginate,
  type BlacklistFiltersValue,
} from '@/modules/contacts/contacts-blacklist/utils/blacklist-filters';
import { BlacklistFilters } from './BlacklistFilters';
import { BlacklistTable } from './BlacklistTable';

interface BlacklistListProps {
  data: IBlacklist[];
  filters: BlacklistFiltersValue;
}

export function BlacklistList({ data, filters }: BlacklistListProps) {
  const filteredData = filterBlacklist(data, filters);

  const { items, currentPage, totalPages } = paginate(
    filteredData,
    filters.page
  );

  return (
    <div className="flex flex-col gap-4">
      <BlacklistFilters />

      <BlacklistTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
