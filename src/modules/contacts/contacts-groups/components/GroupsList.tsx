import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';
import {
  filterGroups,
  type GroupsFiltersValue,
} from '@/modules/contacts/contacts-groups/utils/groups-filters';
import { GroupsFilters } from './GroupsFilters';
import { GroupsGrid } from './GroupsGrid';

interface GroupsListProps {
  data: IGroup[];
  filters: GroupsFiltersValue;
}

export function GroupsList({ data, filters }: GroupsListProps) {
  const groups = filterGroups(data, filters);

  return (
    <div className="flex flex-col gap-4">
      <GroupsFilters />

      {groups.length === 0 && (
        <p className="text-sm text-muted-content">Nenhum grupo encontrado.</p>
      )}

      <GroupsGrid groups={groups} />
    </div>
  );
}
