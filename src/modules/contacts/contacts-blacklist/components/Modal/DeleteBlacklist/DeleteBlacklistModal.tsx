'use client';

import { DeleteModal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { IBlacklist } from '@/modules/contacts/contacts-blacklist/interfaces/blacklist';

interface DeleteBlacklistModalProps {
  item?: IBlacklist | null;
  onClose?: () => void;
}

export function DeleteBlacklistModal({
  item,
  onClose,
}: DeleteBlacklistModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirmDelete = () => {
    if (!item) return;

    // TODO: substituir pela chamada à API
    console.log('Eliminar da blacklist', item.id);
    success('Número eliminado com sucesso!');
    handleClose();
  };

  if (!item) return null;

  return (
    <DeleteModal
      id="DELETE_BLACKLIST"
      title="Eliminar número bloqueado"
      itemType="número"
      itemName={item.number}
      warningMessage="O número será removido definitivamente da lista de bloqueados."
      confirmText="Eliminar"
      onConfirm={handleConfirmDelete}
      onClose={handleClose}
    />
  );
}
