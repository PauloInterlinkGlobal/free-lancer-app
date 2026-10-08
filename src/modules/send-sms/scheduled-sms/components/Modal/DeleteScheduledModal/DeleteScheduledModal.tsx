'use client';

import { DeleteModal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { IScheduledSms } from '@/modules/send-sms/scheduled-sms/interfaces/scheduled-sms';
import React from 'react';

interface DeleteScheduledModalProps {
  scheduled?: IScheduledSms | null;
  onClose?: () => void;
  onDeleted?: (scheduled: IScheduledSms) => void;
}

export function DeleteScheduledModal({
  scheduled,
  onClose,
  onDeleted,
}: DeleteScheduledModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirmDelete = () => {
    if (!scheduled) return;

    success(
      `Agendamento "${scheduled.reference}" cancelado e eliminado com sucesso!`
    );
    onDeleted?.(scheduled);
    handleClose();
  };

  if (!scheduled) return null;

  return (
    <DeleteModal
      id="DELETE_SCHEDULED_SMS"
      title="Eliminar SMS Agendado"
      itemType="agendamento de SMS"
      itemName={`Ref: ${scheduled.reference}`}
      warningMessage="O disparo programado será cancelado definitivamente e as mensagens não serão enviadas."
      confirmText="Eliminar Agendamento"
      onConfirm={handleConfirmDelete}
      onClose={handleClose}
    />
  );
}

export default DeleteScheduledModal;
