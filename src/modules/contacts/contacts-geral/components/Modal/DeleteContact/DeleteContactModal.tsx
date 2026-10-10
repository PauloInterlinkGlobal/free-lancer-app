'use client';

import { DeleteModal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';

interface DeleteContactModalProps {
  contact?: IContact | null;
  onClose?: () => void;
  onDeleted?: (contact: IContact) => void;
}

export function DeleteContactModal({
  contact,
  onClose,
  onDeleted,
}: DeleteContactModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirmDelete = () => {
    if (!contact) return;

    success(`Contacto "${contact.name}" eliminado com sucesso!`);
    onDeleted?.(contact);
    handleClose();
  };

  if (!contact) return null;

  return (
    <DeleteModal
      id="DELETE_CONTACT"
      title="Eliminar Contacto"
      itemType="contacto"
      itemName={contact.name}
      warningMessage="O contacto será removido de todos os grupos a que pertence."
      confirmText="Eliminar"
      onConfirm={handleConfirmDelete}
      onClose={handleClose}
    />
  );
}
