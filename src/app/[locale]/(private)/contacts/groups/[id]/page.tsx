import { ContactsTable } from '@/modules/contacts/contacts-geral/components/ContactsTable';
import { GroupContactsFilters } from '@/modules/contacts/contacts-groups/details/components/GroupContactsFilters';
import { GroupDetailStats } from '@/modules/contacts/contacts-groups/details/components/GroupDetailStats';
import { GroupDetailsHeader } from '@/modules/contacts/contacts-groups/details/components/GroupDetailsHeader';
import { getGroupDetails } from '@/modules/contacts/contacts-groups/details/queries/get-group-details';
import { notFound } from 'next/navigation';

interface GroupDetailsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}

export default async function GroupDetailsPage({
  params,
  searchParams,
}: GroupDetailsPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const details = await getGroupDetails(id, {
    search: query.search,
    status: query.status,
    page: Number(query.page) || 1,
  });
  if (!details) notFound();

  const { group, stats, contacts, currentPage, totalPages } = details;

  return (
    <div className="flex flex-col gap-4">
      <GroupDetailsHeader group={group} />
      <GroupDetailStats groupName={group.name} stats={stats} />
      <GroupContactsFilters />
      <ContactsTable
        data={contacts}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
