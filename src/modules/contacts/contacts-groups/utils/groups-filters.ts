import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';

export type SortOrder = 'asc' | 'desc';

export interface GroupsFiltersValue {
  search: string;
  sort: SortOrder; // asc = A-Z, desc = Z-A
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export function parseGroupsFilters(params: RawParams): GroupsFiltersValue {
  return {
    search: first(params.search) ?? '',
    sort: first(params.sort) === 'desc' ? 'desc' : 'asc',
  };
}

export function filterGroups(
  data: IGroup[],
  filters: GroupsFiltersValue
): IGroup[] {
  const search = filters.search.trim().toLowerCase();

  return data
    .filter(
      (group) =>
        !search ||
        group.name.toLowerCase().includes(search) ||
        group.description.toLowerCase().includes(search)
    )
    .sort((a, b) => {
      const diff = a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' });
      return filters.sort === 'asc' ? diff : -diff;
    });
}
