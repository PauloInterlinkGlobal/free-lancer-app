'use client';

import { DeleteModal } from '@/core/components/Modal/DeleteModal';
import { useModalStore } from '@/core/store/useModalStore';
import { ILink } from '../../../interfaces/links';

interface DeleteLinkModalProps {
  link: ILink | null;
  onConfirm: (link: ILink) => void;
  onClose?: () => void;
}

export function DeleteLinkModal({
  link,
  onConfirm,
  onClose,
}: DeleteLinkModalProps) {
  const { closeModal } = useModalStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirm = () => {
    if (!link) return;
    onConfirm(link);
    handleClose();
  };

  if (!link) return null;

  return (
    <DeleteModal
      id="DELETE_LINK"
      title="Eliminar Link"
      itemType="link"
      itemName={link.description}
      warningMessage="Ao eliminar este link, deixará de estar disponível para inserção em novas mensagens de SMS."
      confirmText="Eliminar"
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
}
