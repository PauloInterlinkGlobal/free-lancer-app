import { statusLabel } from '@/modules/contacts/contacts-geral/constants/contacts';
import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import {
  filterContacts,
  paginate,
  type ContactsFiltersValue,
} from '@/modules/contacts/contacts-geral/utils/contacts-filters';
import { ContactsFilters } from './ContactsFilters';
import { ContactsTable } from './ContactsTable';

interface ContactsListProps {
  data: IContact[];
  filters: ContactsFiltersValue;
}

const statusOptions = Object.entries(statusLabel).map(([value, label]) => ({
  value,
  label,
}));

export function ContactsList({ data, filters }: ContactsListProps) {
  const { items, currentPage, totalPages } = paginate(
    filterContacts(data, filters),
    filters.page
  );

  return (
    <div className="flex flex-col gap-4">
      <ContactsFilters statusOptions={statusOptions} />

      <ContactsTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
