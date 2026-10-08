'use client';

import { DeleteModal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { ISender } from '@/modules/senders/interfaces/senders';

interface DeleteSenderModalProps {
  sender?: ISender | null;
  onClose?: () => void;
  onDeleted?: (sender: ISender) => void;
}

export function DeleteSenderModal({
  sender,
  onClose,
  onDeleted,
}: DeleteSenderModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirmDelete = () => {
    if (!sender) return;

    success(`Remetente "${sender.sender}" eliminado com sucesso!`);
    onDeleted?.(sender);
    handleClose();
  };

  if (!sender) return null;

  return (
    <DeleteModal
      id="DELETE_SENDER"
      title="Eliminar Remetente"
      itemType="remetente"
      itemName={sender.sender}
      warningMessage="As SMS agendadas ou rascunhos que utilizam este sender podem ser afetados."
      confirmText="Eliminar"
      onConfirm={handleConfirmDelete}
      onClose={handleClose}
    />
  );
}
