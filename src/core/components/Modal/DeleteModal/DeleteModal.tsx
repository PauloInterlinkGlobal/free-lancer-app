'use client';

import { ModalType } from '@/core/store/useModalStore';
import { Loader2, Trash2, X } from 'lucide-react';
import React from 'react';
import { Modal } from '../Modal';

export interface DeleteModalProps {
  id?: ModalType;
  isOpen?: boolean;
  title?: string;
  subtitle?: string;
  itemName?: string;
  itemType?: string;
  description?: React.ReactNode;
  warningMessage?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
  className?: string;
}

export function DeleteModal({
  id,
  isOpen,
  title,
  subtitle = 'Esta ação é irreversível.',
  itemName,
  itemType,
  description,
  warningMessage,
  confirmText,
  cancelText = 'Cancelar',
  onConfirm,
  onClose,
  isLoading = false,
  className = '',
}: DeleteModalProps) {
  const resolvedTitle =
    title || (itemName ? `Eliminar ${itemName}` : `Eliminar`);

  const resolvedConfirmText = confirmText || resolvedTitle;

  return (
    <Modal id={id} isOpen={isOpen} onClose={onClose}>
      <div
        className={`w-full max-w-md overflow-hidden rounded-2xl border border-ui bg-surface shadow-2xl ${className}`}
      >
        <div className="flex items-center justify-between border-b border-divider px-6 py-5">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold text-primary-content">
                {resolvedTitle}
              </h2>
              {subtitle && (
                <p className="text-xs text-muted-content mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-6">
          {description ? (
            typeof description === 'string' ? (
              <p className="text-sm text-primary-content leading-relaxed">
                {description}
              </p>
            ) : (
              description
            )
          ) : (
            <p className="text-sm text-primary-content leading-relaxed">
              Tens a certeza de que desejas eliminar{' '}
              {itemType && <span>o {itemType.toLowerCase()} </span>}
              {itemName ? (
                <strong className="text-red-500 font-semibold">
                  &quot;{itemName}&quot;
                </strong>
              ) : (
                'este registo'
              )}
              ?
              {warningMessage && (
                <span className="block mt-1 text-muted-content">
                  {warningMessage}
                </span>
              )}
            </p>
          )}

          {/* Actions */}
          <div className="mt-2 flex items-center justify-end gap-3 border-t border-divider pt-4">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex items-center gap-2 m-auto rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
              {resolvedConfirmText}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg border m-auto border-ui bg-surface px-4 py-2 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover disabled:opacity-50"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export const ConfirmDeleteModal = DeleteModal;
