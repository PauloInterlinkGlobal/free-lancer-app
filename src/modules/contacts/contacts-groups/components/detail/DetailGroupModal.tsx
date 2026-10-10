'use client';

import { Modal } from '@/core/components/Modal';
import type { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';
import { Users } from 'lucide-react';

interface DetailGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: IGroup | null;
  contacts: IContact[];
}

export function DetailGroupModal({
  isOpen,
  onClose,
  group,
  contacts,
}: DetailGroupModalProps) {
  const members = group
    ? contacts.filter((c) => c.groups.includes(group.name))
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-group-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-ui bg-surface shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-divider px-6 py-5">
          <div>
            <h2
              id="detail-group-title"
              className="text-lg font-semibold text-primary-content"
            >
              {group?.name ?? 'Detalhes do grupo'}
            </h2>
            <p className="mt-1 text-sm text-muted-content">
              Detalhes do grupo e dos contactos que o compõem.
            </p>
          </div>
        </div>

        {group && (
          <div className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase text-muted-content">
                Descrição
              </span>
              <p className="text-sm text-primary-content">
                {group.description || 'Sem descrição.'}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              <Users size={12} aria-hidden />
              {group.contactsCount.toLocaleString()}{' '}
              {group.contactsCount === 1 ? 'contacto' : 'contactos'}
            </span>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase text-muted-content">
                Contactos
              </span>

              {members.length === 0 ? (
                <p className="text-sm text-muted-content">
                  Nenhum contacto para mostrar.
                </p>
              ) : (
                <ul className="flex max-h-64 flex-col divide-y divide-divider overflow-y-auto rounded-lg border border-ui">
                  {members.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                    >
                      <span className="truncate font-medium text-primary-content">
                        {c.name}
                      </span>
                      <span className="shrink-0 text-muted-content">
                        {c.number}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end border-t border-divider pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-ui m-auto bg-surface px-4 py-2 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
