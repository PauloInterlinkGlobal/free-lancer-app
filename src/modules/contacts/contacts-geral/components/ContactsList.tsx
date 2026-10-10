// Camada 2 (servidor): filtra e pagina os dados e compõe os componentes cliente.
// Não tem estado nem handlers; as interações ficam nos componentes-folha.
import { statusLabel } from '@/modules/contacts/contacts-geral/constants/contacts';
import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import {
  filterContacts,
  paginate,
  type ContactsFiltersValue,
} from '@/modules/contacts/contacts-geral/utils/contacts-filters';
import { ContactsFilters } from './ContactsFilters';
import { ContactsTable } from './ContactsTable';
import { AddContactModal } from './Modal';

interface ContactsListProps {
  data: IContact[];
  filters: ContactsFiltersValue;
  groupOptions: { value: string; label: string }[];
}

const statusOptions = Object.entries(statusLabel).map(([value, label]) => ({
  value,
  label,
}));

export function ContactsList({ data, filters, groupOptions }: ContactsListProps) {
  const filtered = filterContacts(data, filters);
  const { items, currentPage, totalPages } = paginate(filtered, filters.page);

  return (
    <div className="flex flex-col gap-4">
      <ContactsFilters statusOptions={statusOptions} />

      <ContactsTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <AddContactModal groupOptions={groupOptions} />
    </div>
  );
}
