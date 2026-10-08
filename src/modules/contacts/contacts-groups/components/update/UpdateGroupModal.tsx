'use client';

import { Modal } from '@/core/components/Modal';
import type { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { X } from 'lucide-react';
import { GroupForm, type GroupFormValues } from '../GroupForm';

interface UpdateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: IContact[];
  initialValues: GroupFormValues;
  onSubmit?: (values: GroupFormValues) => void;
}

export function UpdateGroupModal({
  isOpen,
  onClose,
  contacts,
  initialValues,
  onSubmit,
}: UpdateGroupModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-group-title"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-divider px-6 py-5">
          <div>
            <h2
              id="update-group-title"
              className="text-lg font-semibold text-primary-content"
            >
              Atualizar grupo
            </h2>
            <p className="mt-1 text-sm text-muted-content">
              Altere os dados do grupo ou os contactos que o compõem.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <GroupForm
          mode="update"
          initialValues={initialValues}
          contacts={contacts}
          onCancel={onClose}
        />
      </div>
    </Modal>
  );
}
