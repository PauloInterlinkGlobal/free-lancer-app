'use client';

import { DeleteModal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { IDraftSms } from '@/modules/send-sms/draft-sms/interfaces/draft-sms';
import React from 'react';

interface DeleteDraftModalProps {
  draft?: IDraftSms | null;
  onClose?: () => void;
  onDeleted?: (draft: IDraftSms) => void;
}

export function DeleteDraftModal({
  draft,
  onClose,
  onDeleted,
}: DeleteDraftModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirmDelete = () => {
    if (!draft) return;

    success('Rascunho de SMS eliminado com sucesso!');
    onDeleted?.(draft);
    handleClose();
  };

  if (!draft) return null;

  const previewTitle =
    draft.content.length > 35
      ? `"${draft.content.slice(0, 35)}..."`
      : `"${draft.content || 'Rascunho'}"`;

  return (
    <DeleteModal
      id="DELETE_DRAFT_SMS"
      title="Eliminar Rascunho"
      itemType="rascunho de SMS"
      itemName={previewTitle}
      warningMessage="Esta ação não pode ser revertida e o conteúdo deste rascunho será permanentemente excluído."
      confirmText="Eliminar Rascunho"
      onConfirm={handleConfirmDelete}
      onClose={handleClose}
    />
  );
}

export default DeleteDraftModal;
