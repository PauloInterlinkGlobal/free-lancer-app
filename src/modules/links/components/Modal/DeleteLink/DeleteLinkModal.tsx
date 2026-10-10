'use client';

import { DeleteModal } from '@/core/components/Modal/DeleteModal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { useTransition } from 'react';
import { deleteLinkAction } from '../../../actions/links.actions';
import { useLinkDeleteStore } from '../../../store/useLinkDeleteStore';

// Lê o link escolhido pela linha da tabela. Sem link, não há nada a eliminar.
export function DeleteLinkModal() {
  const link = useLinkDeleteStore((state) => state.link);
  const clear = useLinkDeleteStore((state) => state.clear);
  const { closeModal } = useModalStore();
  const { success, error: showError } = useToastStore();
  const [isPending, startTransition] = useTransition();

  if (!link) return null;

  const finish = () => {
    clear();
    closeModal();
  };

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deleteLinkAction(link.id);

      if (result.ok) {
        success(`Link "${link.description}" eliminado com sucesso!`);
      } else {
        showError(result.error);
      }

      finish();
    });
  };

  return (
    <DeleteModal
      id="DELETE_LINK"
      title="Eliminar Link"
      itemType="link"
      itemName={link.description}
      warningMessage="Ao eliminar este link, deixará de estar disponível para inserção em novas mensagens de SMS."
      confirmText="Eliminar"
      onConfirm={handleConfirm}
      onClose={finish}
      isLoading={isPending}
    />
  );
}
