'use client';

import { statusLabel } from '@/modules/contacts/contacts-geral/constants/contacts';
import {
  IContact,
  ICreateContactInput,
} from '@/modules/contacts/contacts-geral/interfaces/contacts';
import {
  filterContacts,
  paginate,
  type ContactsFiltersValue,
} from '@/modules/contacts/contacts-geral/utils/contacts-filters';
import { useState } from 'react';
import { ContactsFilters } from './ContactsFilters';
import { ContactsTable } from './ContactsTable';
import { AddContactModal } from './Modal';

interface ContactsListProps {
  data: IContact[];
  filters: ContactsFiltersValue;
}

const statusOptions = Object.entries(statusLabel).map(([value, label]) => ({
  value,
  label,
}));

export function ContactsList({ data, filters }: ContactsListProps) {
  const [contacts, setContacts] = useState<IContact[]>(data);

  const handleCreate = (input: ICreateContactInput) => {
    // TODO(api): Substituir por chamada de criação na API quando disponível.
    const newContact: IContact = {
      id: `contact-${Date.now()}`,
      name: input.name,
      surname: input.surname,
      number: input.number,
      email: input.email,
      date: new Date().toISOString(),
      groups: input.groups,
      variables: input.variables,
      status: 'active',
    };

    setContacts((prev) => [newContact, ...prev]);
  };

  const filtered = filterContacts(contacts, filters);
  const { items, currentPage, totalPages } = paginate(
    filtered,
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

      <AddContactModal
        existingNumbers={contacts.map((c) => c.number)}
        onCreate={handleCreate}
      />
    </div>
  );
}
