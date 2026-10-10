'use client';

import { UserPlus, X } from 'lucide-react';
import React from 'react';

interface SmsContactsFieldProps {
  contacts: string[];
  totalRecipients: number;
  onRemoveContact: (contact: string) => void;
  onOpenModal: () => void;
}

const MAX_VISIBLE_CONTACTS = 6;

export function SmsContactsField({
  contacts,
  totalRecipients,
  onRemoveContact,
  onOpenModal,
}: SmsContactsFieldProps) {
  const visibleContacts = contacts.slice(0, MAX_VISIBLE_CONTACTS);
  const hiddenContactsCount = contacts.length - MAX_VISIBLE_CONTACTS;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-primary-content">
          Contactos <span className="text-primary">*</span>
        </span>
        <span className="text-xs text-muted-content">
          {totalRecipients} destinatário{totalRecipients === 1 ? '' : 's'} no
          total
        </span>
      </div>

      <div className="flex min-h-[42px] flex-wrap items-center gap-2 rounded-xl border border-dashed border-border-ui bg-surface-raised/40 p-3">
        {contacts.length === 0 && (
          <span className="text-xs text-muted-content">
            Nenhum contacto adicionado
          </span>
        )}

        {visibleContacts.map((contact) => (
          <span
            key={contact}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface py-1 pl-3 pr-2 text-xs font-medium text-primary-content shadow-sm ring-1 ring-border-ui"
          >
            {contact}
            <button
              type="button"
              aria-label={`Remover ${contact}`}
              onClick={() => onRemoveContact(contact)}
              className="flex h-4 w-4 items-center justify-center rounded-full text-muted-content transition-colors hover:bg-surface-subtle hover:text-primary-content"
            >
              <X size={11} aria-hidden />
            </button>
          </span>
        ))}

        {hiddenContactsCount > 0 && (
          <button
            type="button"
            onClick={onOpenModal}
            title={`Mais ${hiddenContactsCount} contacto${hiddenContactsCount === 1 ? '' : 's'}. Clique para gerir todos.`}
            className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20 shadow-sm transition-all hover:bg-primary/20 active:scale-95"
          >
            +{hiddenContactsCount}
          </button>
        )}

        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow active:scale-95"
        >
          <UserPlus size={13} aria-hidden />
          Adicionar
        </button>
      </div>
    </div>
  );
}
