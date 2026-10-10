import { ContactsList } from '@/modules/contacts/contacts-geral/components/ContactsList';
import {
  getAllContacts,
  getGroupOptions,
} from '@/modules/contacts/contacts-geral/services/contacts.service';
import { parseContactsFilters } from '@/modules/contacts/contacts-geral/utils/contacts-filters';

interface ContactsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactsPage({
  searchParams,
}: ContactsPageProps) {
  const filters = parseContactsFilters(await searchParams);
  const data = getAllContacts();
  const groupOptions = getGroupOptions();

  return (
    <ContactsList data={data} filters={filters} groupOptions={groupOptions} />
  );
}
