import { ContactsList } from '@/modules/contacts/contacts-geral/components/ContactsList';
import { contactsMock } from '@/modules/contacts/contacts-geral/mocks/contacts.mock';
import { parseContactsFilters } from '@/modules/contacts/contacts-geral/utils/contacts-filters';

interface ContactsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactsPage({
  searchParams,
}: ContactsPageProps) {
  const filters = parseContactsFilters(await searchParams);
  const data = contactsMock;
  return <ContactsList data={data} filters={filters} />;
}
