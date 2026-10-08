import { GroupsList } from '@/modules/contacts/contacts-groups/components/GroupsList';
import { groupsMock } from '@/modules/contacts/contacts-groups/mocks/groups.mock';
import { parseGroupsFilters } from '@/modules/contacts/contacts-groups/utils/groups-filters';

interface GroupsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function GroupsPage({ searchParams }: GroupsPageProps) {
  const filters = parseGroupsFilters(await searchParams);
  const data = groupsMock;

  return <GroupsList data={data} filters={filters} />;
}
