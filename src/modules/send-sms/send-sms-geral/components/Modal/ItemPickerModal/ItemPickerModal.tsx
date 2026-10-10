'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { useModalStore } from '@/core/store/useModalStore';
import { Check, Search, X } from 'lucide-react';
import React from 'react';
import { ItemPickerList } from './components/ItemPickerList';
import { useItemPicker } from './hooks/useItemPicker';
import type { ItemPickerModalProps } from './types';

export function ItemPickerModal({
  id,
  title,
  description,
  icon: Icon,
  items,
  selectedIds,
  mode,
  pageSize = 6,
  emptyMessage,
  confirmLabel = 'Confirmar',
  onConfirm,
  onClose,
}: ItemPickerModalProps) {
  const { activeModal, closeModal } = useModalStore();
  const isOpen = activeModal === id;

  const {
    draft,
    query,
    setQuery,
    page,
    setPage,
    totalPages,
    pageItems,
    filteredItems,
    allOnPageSelected,
    toggleItem,
    togglePage,
  } = useItemPicker(items, selectedIds, isOpen, mode, pageSize);

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirm = () => {
    onConfirm(draft);
    handleClose();
  };

  return (
    <Modal id={id} onClose={handleClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`picker-title-${id}`}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-divider px-6 py-5">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={20} aria-hidden />
              </div>
            )}
            <div>
              <h2
                id={`picker-title-${id}`}
                className="text-lg font-semibold text-primary-content"
              >
                {title}
              </h2>
              {description && (
                <p className="mt-0.5 text-xs text-muted-content sm:text-sm">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-6 py-5">
          {/* Barra de Pesquisa + Ações Rápidas */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                leftIcon={Search}
                aria-label="Pesquisar"
                placeholder="Pesquisar por título ou descrição..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {mode === 'multiple' && (
              <button
                type="button"
                onClick={togglePage}
                disabled={pageItems.length === 0}
                className="h-10 shrink-0 rounded-lg border border-border-ui bg-surface px-3 text-xs font-medium text-primary-content transition-colors hover:bg-item-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {allOnPageSelected ? 'Desmarcar página' : 'Selecionar página'}
              </button>
            )}
          </div>

          {/* Lista com Paginação */}
          <ItemPickerList
            label={title}
            items={items}
            filteredItems={filteredItems}
            pageItems={pageItems}
            draft={draft}
            mode={mode}
            currentPage={page}
            totalPages={totalPages}
            emptyMessage={emptyMessage}
            onToggleItem={toggleItem}
            onPageChange={setPage}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-divider px-6 py-4">
          <div aria-live="polite">
            {mode === 'multiple' ? (
              <span className="text-xs sm:text-sm text-muted-content">
                <strong className="text-primary-content">{draft.length}</strong>{' '}
                selecionado{draft.length === 1 ? '' : 's'}
              </span>
            ) : (
              <span className="text-xs sm:text-sm text-muted-content">
                {draft.length > 0
                  ? '1 item selecionado'
                  : 'Nenhum item selecionado'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-9 sm:h-10 items-center rounded-lg border border-border-ui bg-surface px-4 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex h-9 sm:h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              <Check size={16} aria-hidden />
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ItemPickerModal;
