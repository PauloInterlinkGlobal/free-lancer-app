import { contactsMock } from '@/modules/contacts/contacts-geral/mocks/contacts.mock';
import type {
  GroupContactsParams,
  GroupDetails,
  GroupStatusCounts,
} from '@/modules/contacts/contacts-groups/details/interfaces/group-details';
import {
  filterGroupContacts,
  paginate,
} from '@/modules/contacts/contacts-groups/details/utils/group-contacts';
import { groupsMock } from '@/modules/contacts/contacts-groups/mocks/groups.mock';

export async function getGroupDetails(
  id: string,
  { search, status, page = 1 }: GroupContactsParams = {}
): Promise<GroupDetails | null> {
  const group = groupsMock.find((item) => String(item.id) === id);
  if (!group) return null;

  const all = contactsMock.filter((contact) =>
    contact.groups.includes(group.name)
  );

  const byStatus = all.reduce<GroupStatusCounts>(
    (acc, contact) => {
      acc[contact.status] += 1;
      return acc;
    },
    { active: 0, inactive: 0, blocked: 0 }
  );

  const filtered = filterGroupContacts(all, { search, status });
  const { items, currentPage, totalPages } = paginate(filtered, page);

  return {
    group,
    stats: { total: all.length, byStatus },
    contacts: items,
    currentPage,
    totalPages,
  };
}
