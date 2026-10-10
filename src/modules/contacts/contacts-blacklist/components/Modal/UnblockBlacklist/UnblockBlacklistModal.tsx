'use client';

import { Modal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { IBlacklist } from '@/modules/contacts/contacts-blacklist/interfaces/blacklist';
import { LockOpen, X } from 'lucide-react';

interface UnblockBlacklistModalProps {
  item?: IBlacklist | null;
  onClose?: () => void;
}

export function UnblockBlacklistModal({
  item,
  onClose,
}: UnblockBlacklistModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirm = () => {
    if (!item) return;

    // TODO: substituir pela chamada à API
    console.log('Desbloquear número', item.id);
    success('Número desbloqueado com sucesso!');
    handleClose();
  };

  if (!item) return null;

  return (
    <Modal id="UNBLOCK_BLACKLIST" onClose={handleClose}>
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-ui bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-divider px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-primary-content">
              Desbloquear número
            </h2>
            <p className="mt-1 text-xs text-muted-content">
              O número voltará a poder receber mensagens.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <p className="text-sm leading-relaxed text-primary-content">
            Tens a certeza de que desejas desbloquear o número{' '}
            <strong className="font-semibold text-primary">
              &quot;{item.number}&quot;
            </strong>
            ?
          </p>

          <div className="mt-2 flex items-center justify-end gap-3 border-t border-divider pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-ui bg-surface px-4 py-2 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <LockOpen size={16} aria-hidden />
              Desbloquear
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
