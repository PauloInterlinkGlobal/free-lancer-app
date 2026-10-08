'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { useModalStore } from '@/core/store/useModalStore';
import { Plus, Search, X } from 'lucide-react';
import React from 'react';
import { ContactTable } from './components/ContactTable';
import { useContactSelection } from './hooks/useContactSelection';
import { SelectContactsModalProps } from './types';

export function SelectContactsModal({
  contacts,
  selected,
  onConfirm,
}: SelectContactsModalProps) {
  const { activeModal, closeModal } = useModalStore();
  const isOpen = activeModal === 'SELECT_CONTACT_SMS';

  const {
    draft,
    query,
    setQuery,
    page,
    setPage,
    totalPages,
    pageItems,
    allOnPageSelected,
    toggleContact,
    togglePage,
  } = useContactSelection(contacts, selected, isOpen);

  return (
    <Modal id="SELECT_CONTACT_SMS">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="select-contacts-title"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-divider px-6 py-5">
          <div>
            <h2
              id="select-contacts-title"
              className="text-lg font-semibold text-primary-content"
            >
              Selecionar contactos
            </h2>
            <p className="mt-1 text-sm text-muted-content">
              Pesquise na sua lista e escolha quem deve receber este SMS.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                leftIcon={Search}
                placeholder="Pesquisar por nome ou número"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <button
              type="button"
              onClick={togglePage}
              disabled={pageItems.length === 0}
              className="h-10 shrink-0 rounded-lg border border-border-ui bg-surface px-3 text-xs font-medium text-primary-content transition-colors hover:bg-item-hover disabled:opacity-50"
            >
              {allOnPageSelected ? 'Desmarcar página' : 'Selecionar página'}
            </button>
          </div>

          <ContactTable
            pageItems={pageItems}
            draft={draft}
            currentPage={page}
            totalPages={totalPages}
            onToggleContact={toggleContact}
            onPageChange={setPage}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-divider px-6 py-4">
          <span className="text-sm text-muted-content">
            {draft.length} selecionado{draft.length === 1 ? '' : 's'}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex h-10 items-center rounded-lg border border-border-ui bg-surface px-4 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => onConfirm(draft)}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Plus size={16} aria-hidden />
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SelectContactsModal;
