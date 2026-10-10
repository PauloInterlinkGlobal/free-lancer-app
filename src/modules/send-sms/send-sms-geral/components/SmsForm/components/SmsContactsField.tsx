'use client';

import { UserPlus, X } from 'lucide-react';
import React from 'react';

interface SmsContactsFieldProps {
  contacts: string[];
  totalRecipients: number;
  onRemoveContact: (contact: string) => void;
  onOpenModal: () => void;
}

export function SmsContactsField({
  contacts,
  totalRecipients,
  onRemoveContact,
  onOpenModal,
}: SmsContactsFieldProps) {
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

      <div className="flex min-h-[42px] max-h-28 flex-wrap items-center gap-2 overflow-y-auto rounded-lg border border-border-ui bg-surface px-3 py-2">
        {contacts.length === 0 && (
          <span className="text-sm text-muted-content">
            Nenhum contacto adicionado
          </span>
        )}

        {contacts.map((contact) => (
          <span
            key={contact}
            className="inline-flex items-center gap-1 rounded-full border border-border-ui bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-primary-content"
          >
            {contact}
            <button
              type="button"
              aria-label={`Remover ${contact}`}
              onClick={() => onRemoveContact(contact)}
              className="text-muted-content transition-colors hover:text-primary-content"
            >
              <X size={12} aria-hidden />
            </button>
          </span>
        ))}

        <button
          type="button"
          onClick={onOpenModal}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border-ui bg-surface px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-item-hover"
        >
          <UserPlus size={14} aria-hidden />
          Adicionar
        </button>
      </div>
    </div>
  );
}
